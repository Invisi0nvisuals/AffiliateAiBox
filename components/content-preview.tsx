"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { Copy, Download, Edit, Calendar, ExternalLink } from "lucide-react"

// Sample content data - in a real app, this would come from an API
const contentExamples = {
  "1": {
    id: "1",
    title: "Why Kartra is the Best Marketing Tool in 2025",
    type: "blog_post",
    product: "Kartra",
    status: "published",
    dateCreated: "2024-03-15",
    platform: "WordPress",
    content: `# Why Kartra is the Best Marketing Tool in 2025

## Introduction
In today's digital landscape, finding the right marketing tool can make all the difference for your business. Kartra stands out as a comprehensive solution that addresses multiple needs.

## Powerful Features
Kartra offers the following key features:
- All-in-one marketing platform
- Email marketing automation
- Landing page builder
- Membership site creation
- Affiliate management

## Benefits
When you use Kartra, you'll experience:
- Save time with automation
- Increase conversion rates
- Streamline your marketing
- All tools in one platform

## Comparison with Competitors
Unlike other platforms that require multiple integrations, Kartra provides everything you need in one place. This eliminates the need for complex tech stacks and reduces your monthly software expenses.

### Kartra vs ClickFunnels
While ClickFunnels excels at sales funnels, Kartra offers a more comprehensive solution that includes email marketing, membership sites, helpdesk, and more.

### Kartra vs ConvertKit
ConvertKit is primarily focused on email marketing, whereas Kartra provides a complete marketing ecosystem.

## Real-World Success Stories
Many entrepreneurs have seen significant results after switching to Kartra:

- Jane D. increased her conversion rates by 35% within the first month
- Mark T. was able to reduce his tech stack from 7 tools to just Kartra, saving $300/month
- Sarah L. launched her online course and generated $25,000 in the first week using Kartra's sales funnels and email sequences

## Pricing and Value
Kartra's pricing starts at $99/month, which might seem higher than some alternatives at first glance. However, when you consider that it replaces 5-7 different tools, it actually provides exceptional value.

## Conclusion
If you're serious about growing your business, Kartra is the tool you need. Try it today and see the difference it can make.

[Try Kartra today](https://example.com/affiliate/kartra)`,
    imageUrl: "/placeholder.svg?height=600&width=800",
  },
  "2": {
    id: "2",
    title: "10 Ways Kartra Can Automate Your Business",
    type: "blog_post",
    product: "Kartra",
    status: "draft",
    dateCreated: "2024-03-18",
    platform: "WordPress",
    content: `# 10 Ways Kartra Can Automate Your Business

## Introduction
Automation is the key to scaling your business without burning out. Kartra provides powerful automation features that can save you time and increase your revenue.

## 1. Email Marketing Sequences
Set up automated email sequences that nurture leads and convert them into customers. Kartra's visual sequence builder makes this process intuitive and powerful.

## 2. Sales Funnels
Create complete sales funnels that automatically guide prospects from awareness to purchase. Kartra's templates make this process quick and easy.

## 3. Lead Scoring
Automatically score leads based on their behavior and engagement, allowing you to focus on the most promising prospects.

## 4. Abandoned Cart Recovery
Recover lost sales with automated emails that remind customers about products they left in their cart.

## 5. Membership Site Automation
Automatically grant and revoke access to content based on subscription status, without any manual intervention.

## 6. Affiliate Program Management
Automate commission calculations, payouts, and affiliate recruitment to grow your sales force without additional work.

## 7. Webinar Automation
Schedule, promote, and run webinars with automated registration, reminders, and follow-ups.

## 8. Customer Onboarding
Create automated onboarding sequences that help new customers get the most out of your product or service.

## 9. Behavioral Triggers
Set up automated actions based on customer behavior, such as visiting a specific page or clicking a particular link.

## 10. Reporting and Analytics
Automatically generate reports on key metrics, allowing you to make data-driven decisions without manual data collection.

## Conclusion
By implementing these automation strategies with Kartra, you can save hours of work each week while providing a better experience for your customers.

[Try Kartra today](https://example.com/affiliate/kartra)`,
    imageUrl: "/placeholder.svg?height=600&width=800",
  },
  "3": {
    id: "3",
    title: "Just discovered how Kartra can 10x your marketing results!",
    type: "social_post",
    product: "Kartra",
    status: "scheduled",
    dateCreated: "2024-03-20",
    platform: "Twitter",
    content: `Just discovered how Kartra can help you save time with automation! The all-in-one marketing platform feature is game-changing. #MarketingTools #Kartra #Productivity

https://example.com/affiliate/kartra`,
    imageUrl: "/placeholder.svg?height=400&width=800",
  },
  "4": {
    id: "4",
    title: "Transform your business with Kartra's automation features",
    type: "social_post",
    product: "Kartra",
    status: "scheduled",
    dateCreated: "2024-03-25",
    platform: "LinkedIn",
    content: `🚀 Transform your marketing with Kartra!

I've been using Kartra and the email marketing automation feature has completely changed how I approach marketing. It helps me increase conversion rates without the usual headaches.

Have you tried it yet? Check it out: https://example.com/affiliate/kartra`,
    imageUrl: "/placeholder.svg?height=400&width=800",
  },
  "5": {
    id: "5",
    title: "Kartra vs ClickFunnels: Which is Better?",
    type: "comparison",
    product: "Kartra",
    status: "published",
    dateCreated: "2024-03-22",
    platform: "WordPress",
    content: `# Kartra vs ClickFunnels: Which is Better?

## Introduction
Choosing the right marketing platform can be challenging. In this comparison, we'll look at two popular options: Kartra and ClickFunnels.

## Feature Comparison

### Sales Funnels
- **Kartra**: Offers a comprehensive funnel builder with customizable templates and behavioral automation.
- **ClickFunnels**: Known for its intuitive funnel builder with a focus on simplicity and speed.

### Email Marketing
- **Kartra**: Includes a full-featured email marketing system with automation, segmentation, and behavioral triggers.
- **ClickFunnels**: Basic email marketing capabilities, often requiring integration with other tools for advanced features.

### Membership Sites
- **Kartra**: Robust membership site functionality with progress tracking and content dripping.
- **ClickFunnels**: Basic membership site capabilities with limited customization options.

### Landing Pages
- **Kartra**: Extensive library of customizable templates with advanced design options.
- **ClickFunnels**: Good selection of templates focused on conversion optimization.

### Pricing
- **Kartra**: Starts at $99/month with more comprehensive features included in the base plan.
- **ClickFunnels**: Starts at $97/month with some features requiring higher-tier plans.

## Use Cases

### Best for E-commerce
Kartra offers more integrated features for e-commerce businesses, including product management, checkout pages, and upsell sequences.

### Best for Course Creators
Both platforms work well for course creators, but Kartra's membership site features and automation make it slightly better for complex course structures.

### Best for Agencies
Kartra's ability to manage multiple clients and campaigns makes it more suitable for marketing agencies.

## Conclusion
While both platforms have their strengths, Kartra offers a more comprehensive all-in-one solution, while ClickFunnels excels at simplicity and ease of use for sales funnels.

For most businesses looking for a complete marketing solution, Kartra provides better value and eliminates the need for multiple tools.

[Try Kartra today](https://example.com/affiliate/kartra)`,
    imageUrl: "/placeholder.svg?height=600&width=800",
  },
}

export function ContentPreview({ contentId }: { contentId: string }) {
  const [activeTab, setActiveTab] = useState("preview")
  const content = contentExamples[contentId as keyof typeof contentExamples]

  if (!content) {
    return (
      <div className="flex h-[400px] items-center justify-center rounded-lg border border-dashed">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Content not found</p>
        </div>
      </div>
    )
  }

  const handleCopyContent = () => {
    navigator.clipboard.writeText(content.content)
    toast({
      title: "Content copied",
      description: "The content has been copied to your clipboard.",
    })
  }

  const handleSchedule = () => {
    toast({
      title: "Content scheduled",
      description: "This content has been added to your posting schedule.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle>{content.title}</CardTitle>
            <CardDescription>
              {content.product} • {content.type.replace("_", " ")} • {content.platform}
            </CardDescription>
          </div>
          <Badge
            variant={
              content.status === "published" ? "default" : content.status === "scheduled" ? "secondary" : "outline"
            }
          >
            {content.status}
          </Badge>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="raw">Raw Content</TabsTrigger>
          {content.imageUrl && <TabsTrigger value="image">Image</TabsTrigger>}
        </TabsList>

        <TabsContent value="preview" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="prose max-w-none dark:prose-invert">
                {content.type === "blog_post" || content.type === "comparison" ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: content.content
                        .replace(/^# (.*$)/gm, "<h1>$1</h1>")
                        .replace(/^## (.*$)/gm, "<h2>$1</h2>")
                        .replace(/^### (.*$)/gm, "<h3>$1</h3>")
                        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                        .replace(/\*(.*?)\*/g, "<em>$1</em>")
                        .replace(/- (.*$)/gm, "<li>$1</li>")
                        .replace(/\n\n/g, "<br/><br/>")
                        .replace(
                          /\[([^\]]+)\]$$([^)]+)$$/g,
                          '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
                        ),
                    }}
                  />
                ) : (
                  <div className="whitespace-pre-wrap">{content.content}</div>
                )}
              </div>
            </CardContent>
          </Card>

          {content.imageUrl && (
            <Card>
              <CardHeader>
                <CardTitle>Featured Image</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-hidden rounded-lg border">
                  <img
                    src={content.imageUrl || "/placeholder.svg"}
                    alt={content.title}
                    className="w-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="raw">
          <Card>
            <CardHeader>
              <CardTitle>Raw Content</CardTitle>
              <CardDescription>The raw markdown or text content that can be edited or copied.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <pre className="max-h-[500px] overflow-auto rounded-lg bg-muted p-4 text-sm">{content.content}</pre>
                <Button size="sm" variant="ghost" className="absolute right-4 top-4" onClick={handleCopyContent}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {content.imageUrl && (
          <TabsContent value="image">
            <Card>
              <CardHeader>
                <CardTitle>Image Preview</CardTitle>
                <CardDescription>Preview the image that will be used with this content.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-hidden rounded-lg border">
                  <img
                    src={content.imageUrl || "/placeholder.svg"}
                    alt={content.title}
                    className="w-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>

      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleCopyContent}>
            <Copy className="mr-2 h-4 w-4" />
            Copy Content
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="outline" onClick={handleSchedule}>
            <Calendar className="mr-2 h-4 w-4" />
            Schedule
          </Button>
          {content.status === "published" && (
            <Button>
              <ExternalLink className="mr-2 h-4 w-4" />
              View Live
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

