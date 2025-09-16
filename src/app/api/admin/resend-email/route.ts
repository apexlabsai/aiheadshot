import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { orderId } = await request.json()
    
    const order = await db.order.findUnique({
      where: { id: orderId },
      include: { user: true }
    })

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    // Here you would integrate with your email service
    // For now, just log the action
    console.log(`Resending email for order ${orderId} to ${order.user.email}`)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error resending email:', error)
    return NextResponse.json(
      { error: 'Failed to resend email' },
      { status: 500 }
    )
  }
}
