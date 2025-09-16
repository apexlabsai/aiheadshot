import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

export async function POST(request: NextRequest) {
  try {
    const { sessionId, productUrl, brandVoice, targetAudience, keyBenefits, addOns } = await request.json()

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 })
    }

    // Verify the session exists and is paid
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    
    if (session.payment_status !== 'paid') {
      return NextResponse.json({ error: 'Payment not completed' }, { status: 400 })
    }

    // Find the order
    const order = await db.order.findUnique({
      where: { stripeId: sessionId }
    })

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    // Update order with form data
    const updatedOrder = await db.order.update({
      where: { id: order.id },
      data: {
        productUrl,
        brandVoice,
        targetAudience,
        keyBenefits: keyBenefits.filter((b: string) => b.trim() !== ''),
        preferences: {
          brandVoice,
          targetAudience,
          keyBenefits: keyBenefits.filter((b: string) => b.trim() !== ''),
          addOns
        },
        updatedAt: new Date(),
      }
    })

    // Update job status to trigger processing
    await db.job.updateMany({
      where: { orderId: order.id },
      data: {
        status: 'QUEUED',
        updatedAt: new Date(),
      }
    })

    // Send order confirmation email
    // This would integrate with your email service
    console.log(`Order updated: ${updatedOrder.id}`)

    return NextResponse.json({ 
      orderId: updatedOrder.id,
      message: 'Order submitted successfully' 
    })
  } catch (error) {
    console.error('Error processing order:', error)
    return NextResponse.json(
      { error: 'Failed to process order' },
      { status: 500 }
    )
  }
}
