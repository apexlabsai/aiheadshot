"use client"

import { useState, useEffect, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, Upload, CheckCircle, AlertCircle } from "lucide-react"
import { useSearchParams } from "next/navigation"

function OrderForm() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  
  const [formData, setFormData] = useState({
    productUrl: '',
    brandVoice: '',
    targetAudience: '',
    keyBenefits: ['', '', ''],
    addOns: {
      igReelCrops: false,
      srtFiles: false
    }
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!sessionId) {
      setError('Invalid session. Please complete your purchase first.')
    }
  }, [sessionId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          ...formData
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit order')
      }

      const result = await response.json()
      setSuccess(true)
      
      // Redirect to order tracking page
      window.location.href = `/orders/${result.orderId}`
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const addBenefit = () => {
    if (formData.keyBenefits.length < 5) {
      setFormData(prev => ({
        ...prev,
        keyBenefits: [...prev.keyBenefits, '']
      }))
    }
  }

  const removeBenefit = (index: number) => {
    setFormData(prev => ({
      ...prev,
      keyBenefits: prev.keyBenefits.filter((_, i) => i !== index)
    }))
  }

  const updateBenefit = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      keyBenefits: prev.keyBenefits.map((benefit, i) => i === index ? value : benefit)
    }))
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Submitted!</h2>
            <p className="text-gray-600 mb-4">
              We're creating your ads now. You'll receive an email when they're ready.
            </p>
            <Button asChild>
              <a href="/orders">Track Your Order</a>
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
          <h1 className="text-2xl font-bold text-blue-600">UGC Ad Engine</h1>
          <div className="text-sm text-gray-600">
            Step 2 of 2: Tell us about your product
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Create Your Ad Pack</CardTitle>
              <CardDescription>
                Help us understand your product so we can create the perfect ads for you.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <span className="text-red-700">{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Product URL */}
                <div className="space-y-2">
                  <Label htmlFor="productUrl">Product URL *</Label>
                  <Input
                    id="productUrl"
                    type="url"
                    placeholder="https://yourstore.com/product/amazing-widget"
                    value={formData.productUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, productUrl: e.target.value }))}
                    required
                  />
                  <p className="text-sm text-gray-500">
                    Paste your product page URL. We'll analyze it to understand your product.
                  </p>
                </div>

                {/* Brand Voice */}
                <div className="space-y-2">
                  <Label htmlFor="brandVoice">Brand Voice *</Label>
                  <Select
                    value={formData.brandVoice}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, brandVoice: value }))}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your brand voice" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="playful">Playful & Fun</SelectItem>
                      <SelectItem value="minimal">Minimal & Clean</SelectItem>
                      <SelectItem value="clinical">Clinical & Professional</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-500">
                    This will influence the tone and style of your ads.
                  </p>
                </div>

                {/* Target Audience */}
                <div className="space-y-2">
                  <Label htmlFor="targetAudience">Target Audience *</Label>
                  <Input
                    id="targetAudience"
                    placeholder="e.g., Young professionals aged 25-35 who value convenience"
                    value={formData.targetAudience}
                    onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
                    required
                  />
                  <p className="text-sm text-gray-500">
                    Describe who you're trying to reach with these ads.
                  </p>
                </div>

                {/* Key Benefits */}
                <div className="space-y-2">
                  <Label>Key Benefits *</Label>
                  <p className="text-sm text-gray-500 mb-3">
                    List the main benefits of your product (3-5 benefits recommended).
                  </p>
                  
                  {formData.keyBenefits.map((benefit, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder={`Benefit ${index + 1}`}
                        value={benefit}
                        onChange={(e) => updateBenefit(index, e.target.value)}
                        required={index < 3}
                      />
                      {formData.keyBenefits.length > 3 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeBenefit(index)}
                        >
                          ×
                        </Button>
                      )}
                    </div>
                  ))}
                  
                  {formData.keyBenefits.length < 5 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addBenefit}
                      className="w-full"
                    >
                      + Add Another Benefit
                    </Button>
                  )}
                </div>

                {/* Add-ons */}
                <div className="space-y-4">
                  <Label>Add-ons (Optional)</Label>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="igReelCrops"
                        checked={formData.addOns.igReelCrops}
                        onCheckedChange={(checked) => 
                          setFormData(prev => ({
                            ...prev,
                            addOns: { ...prev.addOns, igReelCrops: checked as boolean }
                          }))
                        }
                      />
                      <div className="flex-1">
                        <Label htmlFor="igReelCrops" className="font-medium">
                          Instagram Reel Crops (+$39)
                        </Label>
                        <p className="text-sm text-gray-500">
                          Get 1:1 square versions optimized for Instagram feed
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="srtFiles"
                        checked={formData.addOns.srtFiles}
                        onCheckedChange={(checked) => 
                          setFormData(prev => ({
                            ...prev,
                            addOns: { ...prev.addOns, srtFiles: checked as boolean }
                          }))
                        }
                      />
                      <div className="flex-1">
                        <Label htmlFor="srtFiles" className="font-medium">
                          SRT Caption Files (+$19)
                        </Label>
                        <p className="text-sm text-gray-500">
                          Get separate caption files for easy editing and A/B testing
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    'Creating Your Ads...'
                  ) : (
                    <>
                      Submit & Start Generation
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function OrderPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderForm />
    </Suspense>
  )
}
