"use client"

import { useState, useEffect, Suspense } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Play, Share2, Copy } from "lucide-react"

interface Order {
  id: string
  status: string
  outputFiles: string[]
  productUrl: string
  brandVoice: string
  targetAudience: string
  keyBenefits: string[]
}

function GalleryContent() {
  const params = useParams()
  const orderId = params.id as string
  
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

  useEffect(() => {
    fetchOrder()
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

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy to clipboard:', err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p>Loading your ads...</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-2">Gallery Not Found</h2>
            <p className="text-gray-600 mb-4">
              {error || 'The gallery you\'re looking for doesn\'t exist.'}
            </p>
            <Button asChild>
              <a href="/">Go Home</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (order.status !== 'DONE' || !order.outputFiles || order.outputFiles.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Ads Not Ready Yet</h2>
            <p className="text-gray-600 mb-4">
              Your ads are still being processed. Check back in a few minutes.
            </p>
            <Button asChild>
              <a href={`/orders/${orderId}`}>Track Order</a>
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
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Your Ad Gallery</h1>
            <p className="text-gray-600">Order #{order.id.slice(-8)} • {order.outputFiles.length} videos ready</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => copyToClipboard(window.location.href)}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button asChild>
              <a href={`/api/download/${orderId}`}>
                <Download className="h-4 w-4 mr-2" />
                Download All
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Product Details</h4>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>URL:</strong> {order.productUrl}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Brand Voice:</strong> {order.brandVoice}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Target:</strong> {order.targetAudience}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Key Benefits</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {order.keyBenefits?.map((benefit, index) => (
                      <li key={index}>• {benefit}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Video Gallery */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Ads</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {order.outputFiles.map((file, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="aspect-[9/16] bg-gray-100 relative group">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Play className="h-8 w-8 text-white" />
                        </div>
                        <p className="text-sm text-gray-500">Ad #{index + 1}</p>
                      </div>
                    </div>
                    
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="flex gap-2">
                        <Button size="sm" variant="secondary">
                          <Play className="h-4 w-4 mr-1" />
                          Play
                        </Button>
                        <Button size="sm" asChild>
                          <a href={file} download>
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Ad #{index + 1}</h3>
                      <Badge variant="secondary">9:16</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      TikTok-ready vertical video with captions
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Copy className="h-4 w-4 mr-1" />
                        Copy Link
                      </Button>
                      <Button size="sm" asChild className="flex-1">
                        <a href={file} download>
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Usage Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>How to Use Your Ads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">1. Upload to Ad Platform</h4>
                  <p className="text-sm text-gray-600">
                    Upload these videos directly to TikTok Ads Manager, Facebook Ads, or Instagram Ads.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">2. Test Different Versions</h4>
                  <p className="text-sm text-gray-600">
                    Start with small budgets to test which ads perform best, then scale the winners.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">3. Optimize Based on Results</h4>
                  <p className="text-sm text-gray-600">
                    Use the performance data to create similar ads or request revisions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Support */}
          <Card>
            <CardContent className="pt-6 text-center">
              <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
              <p className="text-gray-600 mb-4">
                Have questions about your ads or need revisions? We're here to help.
              </p>
              <div className="flex gap-4 justify-center">
                <Button variant="outline" asChild>
                  <a href="mailto:support@yourdomain.com">Email Support</a>
                </Button>
                <Button asChild>
                  <a href={`/orders/${orderId}`}>Track Order</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function GalleryPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GalleryContent />
    </Suspense>
  )
}
