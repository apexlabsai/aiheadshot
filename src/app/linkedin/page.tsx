import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Star, Users, ArrowRight, Linkedin, TrendingUp, Target } from "lucide-react"
import Link from "next/link"

export default function LinkedInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
            <Linkedin className="h-3 w-3 mr-1" />
            LinkedIn Optimized
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Still using a cropped selfie on{" "}
            <span className="text-blue-600">LinkedIn?</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Recruiters skip profiles with unprofessional photos. Get 5 LinkedIn-ready headshots that make you look hireable in 24 hours.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/buy">
                Get My LinkedIn Headshots - $149
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
              <Link href="#how-it-works">
                See Examples
              </Link>
            </Button>
          </div>
          
          {/* Social Proof */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>500+ professionals trust us</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>4.9/5 average rating</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span>3x more interview requests</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Your LinkedIn photo is costing you opportunities
          </h2>
          <p className="text-xl text-gray-600">
            First impressions matter. Here's what recruiters see when they visit your profile.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="border-2 border-red-200">
            <CardHeader>
              <CardTitle className="text-red-600">❌ What Recruiters See</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Cropped selfie from vacation</span>
                </div>
                <p className="text-sm text-gray-600">
                  • Blurry, low-quality photo<br/>
                  • Unprofessional background<br/>
                  • Poor lighting and framing<br/>
                  • Looks like a social media post
                </p>
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-700 text-sm font-medium">
                    Result: 73% of recruiters skip these profiles
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-2 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-600">✅ What We Create</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-48 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">Professional Headshot</span>
                </div>
                <p className="text-sm text-gray-600">
                  • Studio-quality lighting<br/>
                  • Professional background<br/>
                  • Perfect framing and composition<br/>
                  • LinkedIn-optimized format
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-green-700 text-sm font-medium">
                    Result: 3x more interview requests
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why LinkedIn professionals choose us
            </h2>
            <p className="text-xl text-gray-600">
              We understand what makes a great LinkedIn profile photo
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Recruiter-Tested</h3>
              <p className="text-gray-600">
                Our photos are optimized based on what recruiters and hiring managers actually look for.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Proven Results</h3>
              <p className="text-gray-600">
                Our clients see 3x more profile views and 2x more interview requests.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Linkedin className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">LinkedIn Optimized</h3>
              <p className="text-gray-600">
                Perfect dimensions, lighting, and composition specifically for LinkedIn's platform.
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
              What LinkedIn professionals say
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Sarah Chen",
                role: "Marketing Manager",
                company: "Tech Corp",
                content: "I got 3x more recruiter messages after updating my LinkedIn photo. The difference was immediate.",
                rating: 5,
                result: "3x more recruiter messages"
              },
              {
                name: "Mike Rodriguez",
                role: "Software Engineer",
                company: "StartupXYZ",
                content: "Finally, a professional photo that actually looks like me. Got my dream job within 2 weeks.",
                rating: 5,
                result: "Landed dream job in 2 weeks"
              },
              {
                name: "Emma Thompson",
                role: "Sales Director",
                company: "Enterprise Inc",
                content: "My profile views increased by 400% after using these photos. Worth every penny.",
                rating: 5,
                result: "400% more profile views"
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
                  <p className="text-sm text-gray-500">{testimonial.role} at {testimonial.company}</p>
                </div>
                <Badge variant="secondary" className="text-green-600 bg-green-100">
                  {testimonial.result}
                </Badge>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to upgrade your LinkedIn presence?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join 500+ professionals who've transformed their LinkedIn profiles and landed better opportunities.
          </p>
          
          <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6">
            <Link href="/buy">
              Get My LinkedIn Headshots - $149
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
