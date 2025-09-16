"use client"

import { useState, useEffect, Suspense } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, AlertCircle, Download, RefreshCw } from "lucide-react"

interface Order {
  id: string
  status: string
  productUrl: string
  brandVoice: string
  targetAudience: string
  keyBenefits: string[]
  outputFiles: string[]
  createdAt: string
  updatedAt: string
  etaMinutes?: number
  error?: string
}

function OrderTrackingContent() {
  const params = useParams()
  const orderId = params.id as string
  
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchOrder()
    
    // Poll for updates every 10 seconds
    const interval = setInterval(fetchOrder, 10000)
    return () => clearInterval(interval)
  }, [orderId])

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/orders/${orderId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch order')
      }
      const data = await response.json()
      setOrder(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'DONE':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'PROCESSING':
        return <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />
      case 'FAILED':
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'DONE':
        return <Badge className="bg-green-100 text-green-800">Complete</Badge>
      case 'PROCESSING':
        return <Badge className="bg-blue-100 text-blue-800">Processing</Badge>
      case 'FAILED':
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">Queued</Badge>
    }
  }

  const getProgress = (status: string) => {
    switch (status) {
      case 'QUEUED':
        return 10
      case 'PROCESSING':
        return 60
      case 'DONE':
        return 100
      case 'FAILED':
        return 0
      default:
        return 0
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6 text-center">
            <RefreshCw className="h-8 w-8 text-blue-500 animate-spin mx-auto mb-4" />
            <p>Loading order details...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Order Not Found</h2>
            <p className="text-gray-600 mb-4">
              {error || 'The order you\'re looking for doesn\'t exist.'}
            </p>
            <Button asChild>
              <a href="/">Go Home</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">Order Tracking</h1>
          <Button variant="outline" onClick={fetchOrder}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Order Status */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    Order #{order.id.slice(-8)}
                  </CardTitle>
                  <CardDescription>
                    Created {new Date(order.createdAt).toLocaleDateString()}
                  </CardDescription>
                </div>
                {getStatusBadge(order.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>{getProgress(order.status)}%</span>
                  </div>
                  <Progress value={getProgress(order.status)} className="h-2" />
                </div>
                
                {order.status === 'PROCESSING' && order.etaMinutes && (
                  <p className="text-sm text-gray-600">
                    Estimated completion: {order.etaMinutes} minutes
                  </p>
                )}
                
                {order.status === 'FAILED' && order.error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-700 text-sm">
                      <strong>Error:</strong> {order.error}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Order Details */}
          <Card>
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Product URL</label>
                <p className="text-sm">{order.productUrl || 'Not provided'}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Brand Voice</label>
                <p className="text-sm capitalize">{order.brandVoice || 'Not specified'}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Target Audience</label>
                <p className="text-sm">{order.targetAudience || 'Not specified'}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Key Benefits</label>
                <ul className="text-sm list-disc list-inside">
                  {order.keyBenefits?.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  )) || <li>Not specified</li>}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Output Files */}
          {order.status === 'DONE' && order.outputFiles && order.outputFiles.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Your Ads Are Ready! 🎉</CardTitle>
                <CardDescription>
                  Download your {order.outputFiles.length} TikTok-ready ads
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {order.outputFiles.map((file, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="bg-gray-100 h-32 rounded-lg flex items-center justify-center mb-2">
                        <span className="text-gray-500">Video Preview {index + 1}</span>
                      </div>
                      <p className="text-sm font-medium">Ad #{index + 1}</p>
                      <p className="text-xs text-gray-500">9:16 format, ready for TikTok</p>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  <Button asChild>
                    <a href={`/gallery/${order.id}`}>
                      <Download className="h-4 w-4 mr-2" />
                      View Gallery
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href={`/api/download/${order.id}`}>
                      Download All Videos
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Status Messages */}
          {order.status === 'QUEUED' && (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Clock className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Your order is in the queue</h3>
                  <p className="text-gray-600">
                    We'll start processing your ads shortly. You'll receive an email when they're ready.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {order.status === 'PROCESSING' && (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <RefreshCw className="h-12 w-12 text-blue-500 mx-auto mb-4 animate-spin" />
                  <h3 className="text-lg font-semibold mb-2">Creating your ads</h3>
                  <p className="text-gray-600">
                    Our AI is working on your {order.keyBenefits?.length || 5} ads. This usually takes 1-2 hours.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default function OrderTrackingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderTrackingContent />
    </Suspense>
  )
}
