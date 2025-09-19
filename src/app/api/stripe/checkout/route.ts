import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

// Get base URL for redirects
function getBaseUrl() {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  if (getBaseUrl()) {
    return getBaseUrl()
  }
  return 'http://localhost:3000'
}

export async function POST(request: NextRequest) {
  try {
    const { priceId } = await request.json()
    
    if (!priceId) {
      return NextResponse.json({ error: 'Price ID is required' }, { status: 400 })
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${getBaseUrl()}/order?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${getBaseUrl()}/buy`,
      metadata: {
        product: 'ad_pack'
      }
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Check if required environment variables are set
    if (!process.env.STRIPE_SECRET_KEY || !process.env.PRICE_AD_PACK) {
      console.error('Missing required environment variables:', {
        STRIPE_SECRET_KEY: !!process.env.STRIPE_SECRET_KEY,
        PRICE_AD_PACK: !!process.env.PRICE_AD_PACK
      })
      return NextResponse.redirect(`${getBaseUrl()}/buy?error=config_missing`)
    }

    // Create a default checkout session for the main ad pack
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: process.env.PRICE_AD_PACK!,
          quantity: 1,
        },
      ],
      success_url: `${getBaseUrl()}/order?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${getBaseUrl()}/buy`,
      metadata: {
        product: 'ad_pack'
      }
    })

    return NextResponse.redirect(session.url!)
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.redirect(`${getBaseUrl()}/buy?error=checkout_failed`)
  }
}
