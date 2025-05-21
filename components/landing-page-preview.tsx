"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { Copy, Download, Edit, ExternalLink, Code } from "lucide-react"

// Sample landing page data - in a real app, this would come from an API
const landingPageExamples = {
  "1": {
    id: "1",
    title: "The Kartra Setup Checklist",
    type: "checklist",
    product: "Kartra",
    status: "active",
    dateCreated: "2024-03-10",
    downloads: 127,
    description: "This checklist will guide you through setting up Kartra for maximum success.",
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>The Kartra Setup Checklist | Kartra</title>
  <style>
      body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; max-width: 1200px; margin: 0 auto; padding: 20px; }
      .hero { text-align: center; padding: 60px 20px; background-color: #f5f9ff; border-radius: 10px; margin-bottom: 40px; }
      .hero h1 { font-size: 2.5rem; margin-bottom: 20px; color: #2a4365; }
      .hero p { font-size: 1.2rem; max-width: 800px; margin: 0 auto 30px; color: #4a5568; }
      .cta-button { display: inline-block; background-color: #4299e1; color: white; font-weight: bold; padding: 15px 30px; border-radius: 5px; text-decoration: none; font-size: 1.1rem; transition: background-color 0.3s; }
      .cta-button:hover { background-color: #3182ce; }
      .features { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; margin-bottom: 60px; }
      .feature { padding: 30px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
      .feature h3 { margin-top: 0; color: #2a4365; }
      .form-container { max-width: 500px; margin: 0 auto; padding: 30px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
      .form-group { margin-bottom: 20px; }
      .form-group label { display: block; margin-bottom: 5px; font-weight: bold; }
      .form-group input { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; }
      .testimonials { margin-top: 60px; }
      .testimonial { padding: 20px; margin-bottom: 20px; border-left: 4px solid #4299e1; background-color: #f8fafc; }
      .testimonial-author { font-weight: bold; margin-top: 10px; }
  </style>
</head>
<body>
  <div class="hero">
      <h1>The Ultimate Kartra Setup Checklist</h1>
      <p>Get your Kartra account set up correctly from day one with our comprehensive checklist. Save time, avoid common mistakes, and start generating results faster!</p>
      <a href="#form" class="cta-button">Get The Free Checklist</a>
  </div>
  
  <div class="features">
      <div class="feature">
          <h3>Step-by-Step Guide</h3>
          <p>Our checklist walks you through every step of setting up your Kartra account, from initial configuration to advanced features.</p>
      </div>
      <div class="feature">
          <h3>Avoid Common Mistakes</h3>
          <p>Learn from others' mistakes and set up your account correctly the first time, saving hours of troubleshooting.</p>
      </div>
      <div class="feature">
          <h3>Expert Tips Included</h3>
          <p>Get insider tips from Kartra power users that will help you maximize the platform's potential.</p>
      </div>
  </div>
  
  <div class="testimonials">
      <h2>What Others Are Saying</h2>
      <div class="testimonial">
          <p>"This checklist saved me hours of setup time. I was able to get my Kartra account fully configured in just one afternoon!"</p>
          <p class="testimonial-author">- Sarah J., Online Course Creator</p>
      </div>
      <div class="testimonial">
          <p>"As someone who's not very technical, this checklist was a lifesaver. Everything was explained clearly and I didn't miss any important steps."</p>
          <p class="testimonial-author">- Michael T., Business Coach</p>
      </div>
  </div>
  
  <div id="form" class="form-container">
      <h2>Get Your Free Kartra Setup Checklist</h2>
      <p>Enter your details below to receive the checklist instantly:</p>
      <form>
          <div class="form-group">
              <label for="name">Your Name</label>
              <input type="text" id="name" placeholder="Enter your name" required>
          </div>
          <div class="form-group">
              <label for="email">Email Address</label>
              <input type="email" id="email" placeholder="Enter your email" required>
          </div>
          <button type="submit" class="cta-button">Send Me The Checklist</button>
      </form>
  </div>
  
  <footer style="text-align: center; margin-top: 60px; padding-top: 20px; border-top: 1px solid #eee;">
      <p>© 2024 Kartra. All rights reserved.</p>
  </footer>
</body>
</html>
    `,
    imageUrl: "/placeholder.svg?height=600&width=800",
    url: "https://example.com/kartra-checklist",
    items: [
      "Set up your Kartra account and complete your profile",
      "Define your target audience and customer avatar",
      "Create your first landing page for lead capture",
      "Set up your welcome email sequence",
      "Create a lead magnet to offer visitors",
      "Set up tracking for your campaigns",
      "Create a sales funnel for your main product",
      "Set up abandoned cart recovery emails",
      "Create a customer onboarding sequence",
      "Set up analytics and reporting dashboards",
    ],
  },
  "2": {
    id: "2",
    title: "The Ultimate Guide to Marketing Automation with Kartra",
    type: "ebook",
    product: "Kartra",
    status: "active",
    dateCreated: "2024-03-15",
    downloads: 89,
    description: "Learn how to automate your marketing and save hours every week with Kartra.",
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>The Ultimate Guide to Marketing Automation with Kartra</title>
  <style>
      body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; max-width: 1200px; margin: 0 auto; padding: 20px; }
      .hero { text-align: center; padding: 80px 20px; background: linear-gradient(135deg, #4299e1 0%, #667eea 100%); color: white; border-radius: 10px; margin-bottom: 40px; }
      .hero h1 { font-size: 2.8rem; margin-bottom: 20px; }
      .hero p { font-size: 1.3rem; max-width: 800px; margin: 0 auto 30px; opacity: 0.9; }
      .cta-button { display: inline-block; background-color: white; color: #4a5568; font-weight: bold; padding: 15px 30px; border-radius: 5px; text-decoration: none; font-size: 1.1rem; transition: all 0.3s; }
      .cta-button:hover { transform: translateY(-2px); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
      .benefits { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; margin: 60px 0; }
      .benefit { text-align: center; padding: 30px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: transform 0.3s; }
      .benefit:hover { transform: translateY(-5px); }
      .benefit h3 { color: #2a4365; margin-top: 20px; }
      .benefit-icon { font-size: 2.5rem; color: #4299e1; }
      .ebook-preview { display: flex; align-items: center; gap: 40px; margin: 80px 0; }
      .ebook-image { flex: 1; }
      .ebook-image img { max-width: 100%; border-radius: 8px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
      .ebook-content { flex: 1; }
      .ebook-content h2 { color: #2a4365; margin-top: 0; }
      .ebook-content ul { padding-left: 20px; }
      .ebook-content li { margin-bottom: 10px; }
      .form-container { max-width: 500px; margin: 0 auto; padding: 40px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); background-color: #f8fafc; }
      .form-group { margin-bottom: 20px; }
      .form-group label { display: block; margin-bottom: 5px; font-weight: bold; }
      .form-group input { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 4px; }
      .author { display: flex; align-items: center; gap: 20px; margin: 60px 0; padding: 30px; border-radius: 8px; background-color: #f8fafc; }
      .author-image { width: 100px; height: 100px; border-radius: 50%; overflow: hidden; }
      .author-image img { width: 100%; height: 100%; object-fit: cover; }
      .author-bio h3 { margin-top: 0; color: #2a4365; }
  </style>
</head>
<body>
  <div class="hero">
      <h1>The Ultimate Guide to Marketing Automation with Kartra</h1>
      <p>Discover how to save 10+ hours every week by automating your marketing tasks while increasing your conversion rates and revenue.</p>
      <a href="#form" class="cta-button">Download Free eBook</a>
  </div>
  
  <div class="benefits">
      <div class="benefit">
          <div class="benefit-icon">⏱️</div>
          <h3>Save Time</h3>
          <p>Learn how to automate repetitive marketing tasks and reclaim hours of your time every week.</p>
      </div>
      <div class="benefit">
          <div class="benefit-icon">📈</div>
          <h3>Increase Conversions</h3>
          <p>Discover automation sequences that nurture leads and increase your conversion rates.</p>
      </div>
      <div class="benefit">
          <div class="benefit-icon">🚀</div>
          <h3>Scale Your Business</h3>
          <p>Build systems that allow your business to grow without requiring more of your time.</p>
      </div>
  </div>
  
  <div class="ebook-preview">
      <div class="ebook-image">
          <img src="/placeholder.svg?height=600&width=400" alt="eBook Cover">
      </div>
      <div class="ebook-content">
          <h2>What You'll Learn Inside</h2>
          <ul>
              <li><strong>Chapter 1:</strong> Introduction to Marketing Automation with Kartra</li>
              <li><strong>Chapter 2:</strong> Setting Up Your First Email Automation Sequence</li>
              <li><strong>Chapter 3:</strong> Creating High-Converting Sales Funnels</li>
              <li><strong>Chapter 4:</strong> Behavioral Triggers and Personalization</li>
              <li><strong>Chapter 5:</strong> Abandoned Cart Recovery Strategies</li>
              <li><strong>Chapter 6:</strong> Customer Onboarding and Retention Automation</li>
              <li><strong>Chapter 7:</strong> Analytics and Optimization</li>
              <li><strong>Chapter 8:</strong> Advanced Automation Strategies for Scaling</li>
          </ul>
          <p>Plus, get access to 5 ready-to-use automation templates you can import directly into your Kartra account and start using today!</p>
      </div>
  </div>
  
  <div class="author">
      <div class="author-image">
          <img src="/placeholder.svg?height=100&width=100" alt="Author">
      </div>
      <div class="author-bio">
          <h3>About the Author</h3>
          <p>John Smith is a marketing automation expert who has helped over 500 businesses implement effective automation strategies. He's been using Kartra since its launch and is considered one of the leading authorities on the platform.</p>
      </div>
  </div>
  
  <div id="form" class="form-container">
      <h2>Get Your Free eBook Now</h2>
      <p>Enter your details below to receive the eBook instantly:</p>
      <form>
          <div class="form-group">
              <label for="name">Your Name</label>
              <input type="text" id="name" placeholder="Enter your name" required>
          </div>
          <div class="form-group">
              <label for="email">Email Address</label>
              <input type="email" id="email" placeholder="Enter your email" required>
          </div>
          <button type="submit" class="cta-button" style="background-color: #4299e1; color: white; width: 100%;">Send Me The eBook</button>
      </form>
  </div>
  
  <footer style="text-align: center; margin-top: 60px; padding-top: 20px; border-top: 1px solid #eee;">
      <p>© 2024 Kartra. All rights reserved.</p>
  </footer>
</body>
</html>
    `,
    imageUrl: "/placeholder.svg?height=600&width=400",
    url: "https://example.com/kartra-automation-guide",
  },
}

export function LandingPagePreview({ leadMagnetId }: { leadMagnetId: string }) {
  const [activeTab, setActiveTab] = useState("preview")
  const landingPage = landingPageExamples[leadMagnetId as keyof typeof landingPageExamples]

  if (!landingPage) {
    return (
      <div className="flex h-[400px] items-center justify-center rounded-lg border border-dashed">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Landing page not found</p>
        </div>
      </div>
    )
  }

  const handleCopyHtml = () => {
    navigator.clipboard.writeText(landingPage.html)
    toast({
      title: "HTML copied",
      description: "The HTML code has been copied to your clipboard.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle>{landingPage.title}</CardTitle>
            <CardDescription>
              {landingPage.product} • {landingPage.type} • {landingPage.downloads} downloads
            </CardDescription>
          </div>
          <Badge variant={landingPage.status === "active" ? "default" : "outline"}>{landingPage.status}</Badge>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="html">HTML Code</TabsTrigger>
          {landingPage.type === "checklist" && <TabsTrigger value="items">Checklist Items</TabsTrigger>}
        </TabsList>

        <TabsContent value="preview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Landing Page Preview</CardTitle>
              <CardDescription>Preview how your landing page will look to visitors.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="border-t">
                <iframe srcDoc={landingPage.html} title={landingPage.title} className="h-[600px] w-full" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="html">
          <Card>
            <CardHeader>
              <CardTitle>HTML Code</CardTitle>
              <CardDescription>The HTML code for your landing page.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <pre className="max-h-[500px] overflow-auto rounded-lg bg-muted p-4 text-sm">{landingPage.html}</pre>
                <Button size="sm" variant="ghost" className="absolute right-4 top-4" onClick={handleCopyHtml}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {landingPage.type === "checklist" && (
          <TabsContent value="items">
            <Card>
              <CardHeader>
                <CardTitle>Checklist Items</CardTitle>
                <CardDescription>The items included in your checklist.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {landingPage.items?.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="mt-1 h-5 w-5 rounded-full border border-primary flex items-center justify-center">
                        <div className="h-3 w-3 rounded-full bg-primary"></div>
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>

      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleCopyHtml}>
            <Copy className="mr-2 h-4 w-4" />
            Copy HTML
          </Button>
          <Button variant="outline">
            <Code className="mr-2 h-4 w-4" />
            Edit Code
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button>
            <ExternalLink className="mr-2 h-4 w-4" />
            View Live
          </Button>
        </div>
      </div>
    </div>
  )
}

