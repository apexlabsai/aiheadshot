import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Star, ArrowRight, Zap, Clock, Shield, Download } from "lucide-react"
import Link from "next/link"

export default function BuyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            UGC Ad Engine
          </Link>
          <Link href="/">
            <Button variant="outline">← Back to Home</Button>
          </Link>
        </div>
      </div>

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-100">
            🚀 Only 25 packs/day available
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Choose Your Ad Pack
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            One-time payment. No subscriptions. No hidden fees. Get your ads in 24 hours or less.
          </p>
        </div>

        {/* Main Pricing Card */}
        <div className="max-w-md mx-auto">
          <Card className="border-2 border-blue-200 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-blue-600 text-white px-4 py-1">
                Most Popular
              </Badge>
            </div>
            
            <CardHeader className="text-center pt-8">
              <CardTitle className="text-3xl">Ad Pack</CardTitle>
              <CardDescription className="text-lg">
                Everything you need to launch your ads
              </CardDescription>
              <div className="text-5xl font-bold text-blue-600 mt-4">$149</div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">5 TikTok-ready ads (9:16 format)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Professional AI voiceovers</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Burned-in captions for accessibility</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">4 different ad templates</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">24-hour delivery guarantee</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Commercial rights included</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">1 free revision on 2 ads</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">ZIP download with all files</span>
                </li>
              </ul>
              
              <Button asChild size="lg" className="w-full text-lg py-6">
                <Link href="/api/stripe/checkout">
                  Get My 5 Ads Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <p className="text-sm text-gray-500 text-center">
                Secure payment via Stripe • 30-day money-back guarantee
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Add-ons */}
        <div className="max-w-2xl mx-auto mt-16">
          <h3 className="text-2xl font-bold text-center mb-8">Add-ons (Optional)</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg">Instagram Reel Crops</CardTitle>
                <CardDescription>1:1 square versions for Instagram</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-4">+$39</div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 5 square (1:1) versions</li>
                  <li>• Optimized for Instagram feed</li>
                  <li>• Same quality and captions</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg">SRT Caption Files</CardTitle>
                <CardDescription>Separate caption files for editing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-4">+$19</div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 5 SRT files included</li>
                  <li>• Easy to edit and customize</li>
                  <li>• Perfect for A/B testing</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why choose UGC Ad Engine?
            </h2>
            <p className="text-xl text-gray-600">
              We combine AI technology with proven ad strategies
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
              <p className="text-gray-600">
                Our AI analyzes your product and creates compelling hooks, scripts, and visuals that convert.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Get your ads in 24 hours or less. Most orders are completed within 12 hours.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Commercial Rights</h3>
              <p className="text-gray-600">
                Full commercial rights included. Use your ads for any business purpose without restrictions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by 500+ brands
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: "Sarah Chen",
                role: "E-commerce Founder",
                content: "These ads generated 3x more engagement than my previous creatives. The ROI was immediate.",
                rating: 5,
                result: "3x engagement increase"
              },
              {
                name: "Mike Rodriguez",
                role: "DTC Brand Owner",
                content: "I was skeptical about AI-generated ads, but these look completely professional. My conversion rate doubled.",
                rating: 5,
                result: "2x conversion rate"
              },
              {
                name: "Emma Thompson",
                role: "Marketing Director",
                content: "Finally, a service that understands TikTok. The hooks are perfect and the visuals are on point.",
                rating: 5,
                result: "Perfect TikTok optimization"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                <div className="mb-4">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
                <Badge variant="secondary" className="text-green-600 bg-green-100">
                  {testimonial.result}
                </Badge>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "What format are the videos?",
                answer: "All videos are in 9:16 vertical format, optimized for TikTok, Instagram Reels, and Facebook Stories. They're ready to upload directly to your ad platform."
              },
              {
                question: "How long does it take?",
                answer: "Most orders are completed within 24 hours. We'll email you as soon as your ads are ready with a gallery link and download options."
              },
              {
                question: "Can I request revisions?",
                answer: "Yes! We include 1 free revision on up to 2 ads. Just reply to your delivery email within 24 hours with your feedback."
              },
              {
                question: "Do I own the rights to these videos?",
                answer: "Absolutely. You get full commercial rights to use these videos for advertising, social media, and any other business purposes."
              },
              {
                question: "What if I'm not happy with the results?",
                answer: "We offer a 100% satisfaction guarantee. If you're not happy with your ads, we'll either revise them or provide a full refund."
              },
              {
                question: "Can I use these for any product?",
                answer: "Yes! Our AI works with any product URL. Just paste your product link and we'll create compelling ads tailored to your specific product and audience."
              }
            ].map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to get your ads?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join 500+ brands who are already using our AI to create high-converting ads.
          </p>
          
          <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6">
            <Link href="/api/stripe/checkout">
              Get Started Now - $149
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          
          <p className="text-blue-100 text-sm mt-4">
            Secure payment via Stripe • 30-day money-back guarantee
          </p>
        </div>
      </section>
    </div>
  )
}
