import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

async function seedStripeProducts() {
  try {
    console.log('Creating Stripe products...')

    // Create the main Ad Pack product
    const product = await stripe.products.create({
      name: 'Ad Pack',
      description: '5 TikTok-ready ads with professional voiceovers and captions',
      metadata: {
        type: 'ad_pack'
      }
    })

    console.log(`Created product: ${product.id}`)

    // Create the price for the Ad Pack
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: 14900, // $149.00
      currency: 'usd',
      metadata: {
        plan: 'AD_PACK'
      }
    })

    console.log(`Created price: ${price.id}`)
    console.log(`\nAdd this to your .env file:`)
    console.log(`PRICE_AD_PACK=${price.id}`)

    // Create add-on products
    const igReelProduct = await stripe.products.create({
      name: 'Instagram Reel Crops',
      description: '1:1 square versions of your ads for Instagram feed',
      metadata: {
        type: 'addon',
        addon_type: 'ig_reel_crops'
      }
    })

    const igReelPrice = await stripe.prices.create({
      product: igReelProduct.id,
      unit_amount: 3900, // $39.00
      currency: 'usd',
      metadata: {
        addon_type: 'ig_reel_crops'
      }
    })

    console.log(`Created IG Reel addon: ${igReelPrice.id}`)

    const srtProduct = await stripe.products.create({
      name: 'SRT Caption Files',
      description: 'Separate caption files for easy editing and A/B testing',
      metadata: {
        type: 'addon',
        addon_type: 'srt_files'
      }
    })

    const srtPrice = await stripe.prices.create({
      product: srtProduct.id,
      unit_amount: 1900, // $19.00
      currency: 'usd',
      metadata: {
        addon_type: 'srt_files'
      }
    })

    console.log(`Created SRT addon: ${srtPrice.id}`)

    console.log('\n✅ Stripe products created successfully!')
    console.log('\nNext steps:')
    console.log('1. Copy the PRICE_AD_PACK value to your .env file')
    console.log('2. Run: pnpm db:push')
    console.log('3. Start your development server: pnpm dev')

  } catch (error) {
    console.error('Error creating Stripe products:', error)
    process.exit(1)
  }
}

seedStripeProducts()
