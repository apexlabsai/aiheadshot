import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { db } from '@/lib/db'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        
        // Get or create user
        let user = await db.user.findUnique({
          where: { email: session.customer_email! }
        })
        
        if (!user) {
          user = await db.user.create({
            data: {
              email: session.customer_email!,
              name: session.customer_details?.name || null,
            }
          })
        }

        // Create order
        const order = await db.order.create({
          data: {
            userId: user.id,
            stripeId: session.id,
            plan: 'AD_PACK',
            status: 'QUEUED',
            productUrl: null, // Will be filled when user submits form
            preferences: {},
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        })

        // Create job
        await db.job.create({
          data: {
            orderId: order.id,
            status: 'QUEUED',
            template: 'unbox_benefit',
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        })

        console.log(`Order created: ${order.id} for user: ${user.email}`)
        break
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log('Payment succeeded:', paymentIntent.id)
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log('Payment failed:', paymentIntent.id)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}
