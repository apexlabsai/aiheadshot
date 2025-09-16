import { Queue } from '@upstash/redis'
import { db } from '../lib/db'
import { createLLMProvider } from '../providers/llm'
import { createTTSProvider } from '../providers/tts'
import { createVideoFromTemplate } from '../video/compose'
import { promises as fs } from 'fs'
import path from 'path'

export interface JobData {
  orderId: string
  template: string
  productData: any
  preferences: any
}

class QueueWorker {
  private queue: Queue | null = null
  private isProcessing = false
  private maxRetries = 3
  private retryDelay = 5000 // 5 seconds

  constructor() {
    this.initializeQueue()
  }

  private initializeQueue() {
    if (process.env.UPSTASH_Q_REST_URL && process.env.UPSTASH_Q_REST_TOKEN) {
      this.queue = new Queue({
        url: process.env.UPSTASH_Q_REST_URL,
        token: process.env.UPSTASH_Q_REST_TOKEN,
      })
    }
  }

  async start() {
    if (this.queue) {
      // Production: Use Upstash Q
      this.startUpstashWorker()
    } else {
      // Development: Use in-memory worker
      this.startInMemoryWorker()
    }
  }

  private async startUpstashWorker() {
    if (!this.queue) return

    console.log('Starting Upstash Q worker...')
    
    setInterval(async () => {
      if (this.isProcessing) return

      try {
        const job = await this.queue!.pop<JobData>()
        if (job) {
          this.isProcessing = true
          await this.processJob(job)
          this.isProcessing = false
        }
      } catch (error) {
        console.error('Error processing job:', error)
        this.isProcessing = false
      }
    }, 1000) // Check every second
  }

  private async startInMemoryWorker() {
    console.log('Starting in-memory worker...')
    
    setInterval(async () => {
      if (this.isProcessing) return

      try {
        // Get next queued job from database
        const job = await db.job.findFirst({
          where: { status: 'QUEUED' },
          include: { order: true },
          orderBy: { createdAt: 'asc' }
        })

        if (job) {
          this.isProcessing = true
          await this.processJobFromDB(job)
          this.isProcessing = false
        }
      } catch (error) {
        console.error('Error processing job:', error)
        this.isProcessing = false
      }
    }, 5000) // Check every 5 seconds
  }

  private async processJob(jobData: JobData) {
    try {
      console.log(`Processing job for order ${jobData.orderId}`)
      
      // Update job status
      await db.job.update({
        where: { orderId: jobData.orderId },
        data: { status: 'PROCESSING' }
      })

      // Process the job
      await this.processJobFromDB({
        id: jobData.orderId,
        orderId: jobData.orderId,
        status: 'PROCESSING',
        template: jobData.template,
        order: {
          id: jobData.orderId,
          productUrl: jobData.productData.url,
          brandVoice: jobData.preferences.brandVoice,
          targetAudience: jobData.preferences.targetAudience,
          keyBenefits: jobData.preferences.keyBenefits,
          preferences: jobData.preferences
        } as any
      })

    } catch (error) {
      console.error('Error processing job:', error)
      
      // Update job status to failed
      await db.job.update({
        where: { orderId: jobData.orderId },
        data: { 
          status: 'FAILED',
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      })
    }
  }

  private async processJobFromDB(job: any) {
    try {
      console.log(`Processing job ${job.id} for order ${job.orderId}`)
      
      // Update job status
      await db.job.update({
        where: { id: job.id },
        data: { status: 'PROCESSING' }
      })

      // Scrape product data if not already available
      const productData = await this.scrapeProductData(job.order.productUrl)
      
      // Generate script using LLM
      const llm = createLLMProvider()
      const script = await llm.generateScript(
        job.template || 'unbox_benefit',
        productData,
        {
          brandVoice: job.order.brandVoice,
          targetAudience: job.order.targetAudience,
          keyBenefits: job.order.keyBenefits
        }
      )

      // Generate TTS audio
      const tts = createTTSProvider()
      const audioBuffer = await tts.generateVoiceover(script)

      // Create output directory
      const outputDir = path.join(process.cwd(), 'output', job.orderId)
      await fs.mkdir(outputDir, { recursive: true })

      // Save audio file
      const audioPath = path.join(outputDir, 'voiceover.wav')
      await fs.writeFile(audioPath, audioBuffer)

      // Generate video for each template
      const templates = ['unbox_benefit', 'problem_solution', 'three_reasons', 'testimonial_mash']
      const videoPaths: string[] = []

      for (const template of templates) {
        try {
          const videoPath = await createVideoFromTemplate(
            template,
            productData,
            {
              brandVoice: job.order.brandVoice,
              targetAudience: job.order.targetAudience,
              keyBenefits: job.order.keyBenefits
            },
            outputDir
          )
          videoPaths.push(videoPath)
        } catch (error) {
          console.error(`Error generating video for template ${template}:`, error)
        }
      }

      // Update job with results
      await db.job.update({
        where: { id: job.id },
        data: {
          status: 'DONE',
          script,
          outputFiles: videoPaths,
          updatedAt: new Date()
        }
      })

      // Update order with results
      await db.order.update({
        where: { id: job.orderId },
        data: {
          status: 'DONE',
          outputFiles: videoPaths,
          updatedAt: new Date()
        }
      })

      // Send completion email
      await this.sendCompletionEmail(job.orderId, videoPaths)

      console.log(`Job ${job.id} completed successfully`)

    } catch (error) {
      console.error('Error processing job:', error)
      
      // Update job status to failed
      await db.job.update({
        where: { id: job.id },
        data: { 
          status: 'FAILED',
          error: error instanceof Error ? error.message : 'Unknown error',
          retryCount: { increment: 1 }
        }
      })

      // If retry count is below max, requeue the job
      const updatedJob = await db.job.findUnique({ where: { id: job.id } })
      if (updatedJob && updatedJob.retryCount < this.maxRetries) {
        setTimeout(() => {
          this.requeueJob(job.id)
        }, this.retryDelay * Math.pow(2, updatedJob.retryCount)) // Exponential backoff
      }
    }
  }

  private async scrapeProductData(url: string): Promise<any> {
    // Mock product data - in production, this would scrape the actual URL
    return {
      title: 'Amazing Product',
      description: 'This product will change your life',
      price: '$29.99',
      benefits: [
        'Saves you time',
        'Improves your results',
        'Easy to use'
      ],
      reviews: [
        { rating: 5, text: 'Love this product!' },
        { rating: 4, text: 'Great value for money' }
      ],
      url
    }
  }

  private async sendCompletionEmail(orderId: string, videoPaths: string[]) {
    // This would integrate with the email system
    console.log(`Sending completion email for order ${orderId} with ${videoPaths.length} videos`)
  }

  private async requeueJob(jobId: string) {
    try {
      await db.job.update({
        where: { id: jobId },
        data: { status: 'QUEUED' }
      })
      console.log(`Requeued job ${jobId}`)
    } catch (error) {
      console.error(`Error requeuing job ${jobId}:`, error)
    }
  }
}

// Start the worker
const worker = new QueueWorker()
worker.start()

export default worker
