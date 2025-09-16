import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { orderId } = await request.json()
    
    // Update job status to QUEUED for retry
    await db.job.updateMany({
      where: { orderId },
      data: {
        status: 'QUEUED',
        error: null,
        retryCount: { increment: 1 },
        updatedAt: new Date()
      }
    })

    // Update order status
    await db.order.update({
      where: { id: orderId },
      data: {
        status: 'QUEUED',
        error: null,
        updatedAt: new Date()
      }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error retrying job:', error)
    return NextResponse.json(
      { error: 'Failed to retry job' },
      { status: 500 }
    )
  }
}
