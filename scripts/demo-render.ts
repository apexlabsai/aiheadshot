import { createVideoFromTemplate } from '../src/video/compose'
import { promises as fs } from 'fs'
import path from 'path'

async function createDemoVideos() {
  try {
    console.log('Creating demo videos...')

    // Create output directory
    const outputDir = path.join(process.cwd(), 'demo-output')
    await fs.mkdir(outputDir, { recursive: true })

    // Mock product data
    const productData = {
      title: 'Amazing Widget Pro',
      description: 'The ultimate widget that will change your life forever',
      price: '$29.99',
      benefits: [
        'Saves you 2 hours every day',
        'Increases productivity by 300%',
        'Easy to use - no learning curve',
        'Works with all your existing tools',
        '30-day money-back guarantee'
      ],
      reviews: [
        { rating: 5, text: 'This widget changed my life!' },
        { rating: 5, text: 'Best purchase I\'ve made this year' },
        { rating: 4, text: 'Great value for money' }
      ],
      url: 'https://example.com/amazing-widget-pro'
    }

    const preferences = {
      brandVoice: 'playful',
      targetAudience: 'Busy professionals who want to save time',
      keyBenefits: [
        'Saves you 2 hours every day',
        'Increases productivity by 300%',
        'Easy to use - no learning curve'
      ]
    }

    // Generate videos for each template
    const templates = ['unbox_benefit', 'problem_solution', 'three_reasons', 'testimonial_mash']
    
    for (const template of templates) {
      console.log(`Generating ${template}...`)
      
      try {
        const videoPath = await createVideoFromTemplate(
          template,
          productData,
          preferences,
          outputDir
        )
        
        console.log(`✅ Created: ${videoPath}`)
      } catch (error) {
        console.error(`❌ Error creating ${template}:`, error)
      }
    }

    console.log('\n🎉 Demo videos created successfully!')
    console.log(`Check the ${outputDir} directory for your videos.`)
    console.log('\nNote: These are placeholder videos created in mock mode.')
    console.log('In production, they would be real 9:16 videos with voiceovers and captions.')

  } catch (error) {
    console.error('Error creating demo videos:', error)
    process.exit(1)
  }
}

createDemoVideos()
