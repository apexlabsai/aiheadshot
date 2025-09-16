import * as ffmpeg from 'fluent-ffmpeg'
import { promises as fs } from 'fs'
import path from 'path'

export interface VideoComposition {
  template: string
  script: string
  shots: Shot[]
  captions: Caption[]
  outputPath: string
}

export interface Shot {
  id: string
  startTime: number
  endTime: number
  type: string
  description: string
  visual: string
  text: string
  videoPath?: string
  imagePath?: string
}

export interface Caption {
  startTime: number
  endTime: number
  text: string
  position: 'top' | 'center' | 'bottom'
}

export class VideoComposer {
  private stockAssetsPath: string
  private outputPath: string

  constructor(stockAssetsPath: string, outputPath: string) {
    this.stockAssetsPath = stockAssetsPath
    this.outputPath = outputPath
  }

  async composeVideo(composition: VideoComposition): Promise<string> {
    const outputFile = path.join(this.outputPath, `${composition.template}-${Date.now()}.mp4`)
    
    // Create WebVTT captions file
    const vttPath = await this.createWebVTT(composition.captions)
    
    // Build ffmpeg command
    const command = ffmpeg.default()
      .size('1080x1920') // 9:16 aspect ratio
      .fps(30)
      .videoBitrate('2000k')
      .audioBitrate('128k')
      .format('mp4')

    // Add video inputs and filters
    await this.addVideoInputs(command, composition.shots)
    
    // Add audio (TTS)
    if (composition.script) {
      const audioPath = await this.generateTTSAudio(composition.script)
      command.input(audioPath)
    }

    // Add captions
    command.input(vttPath)
      .complexFilter([
        // Video composition filters
        ...this.buildVideoFilters(composition.shots),
        // Caption overlay
        `[0:v]subtitles=${vttPath}:force_style='FontSize=24,PrimaryColour=&Hffffff,OutlineColour=&H000000,Outline=2'[v]`
      ])
      .outputOptions([
        '-map', '[v]',
        '-map', '1:a?', // Map audio if available
        '-c:v', 'libx264',
        '-c:a', 'aac',
        '-preset', 'fast',
        '-crf', '23'
      ])
      .output(outputFile)

    return new Promise((resolve, reject) => {
      command.on('end', () => {
        resolve(outputFile)
      })
      .on('error', (err) => {
        reject(err)
      })
      .run()
    })
  }

  private async createWebVTT(captions: Caption[]): Promise<string> {
    const vttPath = path.join(this.outputPath, `captions-${Date.now()}.vtt`)
    
    let vttContent = 'WEBVTT\n\n'
    
    captions.forEach((caption, index) => {
      const start = this.formatTime(caption.startTime)
      const end = this.formatTime(caption.endTime)
      
      vttContent += `${index + 1}\n`
      vttContent += `${start} --> ${end}\n`
      vttContent += `${caption.text}\n\n`
    })
    
    await fs.writeFile(vttPath, vttContent)
    return vttPath
  }

  private formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)
    const ms = Math.floor((seconds % 1) * 1000)
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`
  }

  private async addVideoInputs(command: any, shots: Shot[]): Promise<void> {
    // Add stock video assets
    const stockVideos = await this.getStockVideos()
    
    for (const video of stockVideos) {
      command.input(video)
    }
  }

  private buildVideoFilters(shots: Shot[]): string[] {
    const filters: string[] = []
    
    // Build complex filter for video composition
    // This is a simplified version - in production, you'd want more sophisticated composition
    
    shots.forEach((shot, index) => {
      if (index === 0) {
        filters.push(`[0:v]trim=duration=${shot.endTime - shot.startTime},setpts=PTS-STARTPTS[v${index}]`)
      } else {
        filters.push(`[${index}:v]trim=duration=${shot.endTime - shot.startTime},setpts=PTS-STARTPTS[v${index}]`)
      }
    })
    
    // Concatenate all video segments
    const concatInputs = shots.map((_, index) => `[v${index}]`).join('')
    filters.push(`${concatInputs}concat=n=${shots.length}:v=1:a=0[outv]`)
    
    return filters
  }

  private async getStockVideos(): Promise<string[]> {
    // Return paths to stock video assets
    // In production, this would scan the stock assets directory
    const stockDir = path.join(this.stockAssetsPath, 'videos')
    
    try {
      const files = await fs.readdir(stockDir)
      return files
        .filter(file => file.endsWith('.mp4') || file.endsWith('.mov'))
        .map(file => path.join(stockDir, file))
    } catch (error) {
      console.warn('Stock videos directory not found, using placeholder')
      return []
    }
  }

  private async generateTTSAudio(script: string): Promise<string> {
    // This would integrate with the TTS provider
    // For now, return a placeholder
    const audioPath = path.join(this.outputPath, `tts-${Date.now()}.wav`)
    
    // Create a silent audio file as placeholder
    const duration = Math.max(script.length * 0.1, 5)
    const sampleRate = 44100
    const samples = Math.floor(duration * sampleRate)
    
    const buffer = Buffer.alloc(samples * 2)
    for (let i = 0; i < samples; i++) {
      const sample = Math.sin(2 * Math.PI * 440 * i / sampleRate) * 0.1
      const intSample = Math.round(sample * 32767)
      buffer.writeInt16LE(intSample, i * 2)
    }
    
    await fs.writeFile(audioPath, buffer)
    return audioPath
  }
}

export async function createVideoFromTemplate(
  template: string,
  productData: any,
  preferences: any,
  outputDir: string
): Promise<string> {
  const composer = new VideoComposer(
    path.join(process.cwd(), 'assets', 'stock'),
    outputDir
  )
  
  // Load template
  const templatePath = path.join(process.cwd(), 'src', 'templates', `${template}.json`)
  const templateData = JSON.parse(await fs.readFile(templatePath, 'utf-8'))
  
  // Generate script using LLM provider
  const { createLLMProvider } = await import('../providers/llm')
  const llm = createLLMProvider()
  const script = await llm.generateScript(template, productData, preferences)
  
  // Create composition
  const composition: VideoComposition = {
    template,
    script,
    shots: templateData.shots.map((shot: any) => ({
      ...shot,
      text: shot.text.replace(/\[Generated from product data\]/g, productData.title)
    })),
    captions: templateData.shots.map((shot: any) => ({
      startTime: shot.startTime,
      endTime: shot.endTime,
      text: shot.text,
      position: 'bottom' as const
    })),
    outputPath: outputDir
  }
  
  return await composer.composeVideo(composition)
}
