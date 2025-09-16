import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, Star, Users, Zap, Clock, Shield } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-100">
            🚀 Only 25 packs/day available
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Turn any product page into{" "}
            <span className="text-blue-600">5 TikTok-ready ads</span>{" "}
            in an hour
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            We write the hook, voice it, cut it, caption it. You hit 'Upload to Ads Manager.'
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/buy">
                Get My 5 Ads - $149
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
              <Link href="#how-it-works">
                See How It Works
              </Link>
            </Button>
          </div>
          
          {/* Social Proof */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>500+ brands trust us</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>4.9/5 average rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              <span>24h delivery</span>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            From product page to viral ads in minutes
          </h2>
          <p className="text-xl text-gray-600">
            No more spending hours on creative. Our AI does the heavy lifting.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="border-2 border-red-200">
            <CardHeader>
              <CardTitle className="text-red-600">❌ Before</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Generic product photo</span>
                </div>
                <p className="text-sm text-gray-600">
                  • Cropped selfie as product shot<br/>
                  • No clear hook or story<br/>
                  • Boring, static visuals<br/>
                  • Hours of editing time
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-2 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-600">✅ After</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-48 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">Professional 9:16 Ad</span>
                </div>
                <p className="text-sm text-gray-600">
                  • Compelling hook & story<br/>
                  • Professional voiceover<br/>
                  • Dynamic visuals & transitions<br/>
                  • Ready in 1 hour
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How it works
            </h2>
            <p className="text-xl text-gray-600">
              Three simple steps to get your ads
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Share your product</h3>
              <p className="text-gray-600">
                Paste your product URL and tell us your brand voice, target audience, and key benefits.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI creates your ads</h3>
              <p className="text-gray-600">
                Our AI writes scripts, generates voiceovers, and creates 5 different ad variations.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Download & launch</h3>
              <p className="text-gray-600">
                Get your 9:16 videos with captions, ready to upload to TikTok, Instagram, or Facebook.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What our customers say
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Sarah Chen",
                role: "E-commerce Founder",
                content: "These ads generated 3x more engagement than my previous creatives. The ROI was immediate.",
                rating: 5
              },
              {
                name: "Mike Rodriguez",
                role: "DTC Brand Owner",
                content: "I was skeptical about AI-generated ads, but these look completely professional. My conversion rate doubled.",
                rating: 5
              },
              {
                name: "Emma Thompson",
                role: "Marketing Director",
                content: "Finally, a service that understands TikTok. The hooks are perfect and the visuals are on point.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ready to get started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            One-time payment. No subscriptions. No hidden fees.
          </p>
          
          <div className="max-w-md mx-auto">
            <Card className="border-2 border-blue-200">
              <CardHeader>
                <CardTitle className="text-2xl">Ad Pack</CardTitle>
                <CardDescription>Everything you need to launch</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold mb-4">$149</div>
                <ul className="space-y-2 text-left mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>5 TikTok-ready ads (9:16)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Professional voiceovers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Burned-in captions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>24h delivery</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Commercial rights included</span>
                  </li>
                </ul>
                <Button asChild size="lg" className="w-full">
                  <Link href="/buy">
                    Get Started Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-20">
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

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">UGC Ad Engine</h3>
              <p className="text-gray-400">
                Turn any product into viral ads with AI. Fast, professional, and effective.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/buy" className="hover:text-white">Pricing</Link></li>
                <li><Link href="#how-it-works" className="hover:text-white">How it works</Link></li>
                <li><Link href="/gallery" className="hover:text-white">Gallery</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/refund" className="hover:text-white">Refund Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 UGC Ad Engine. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}