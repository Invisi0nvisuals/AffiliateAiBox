"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, MessageSquare, Image, Mic } from "lucide-react"

const formSchema = z.object({
  product: z.string({
    required_error: "Please select a product.",
  }),
  contentTypes: z.array(z.string()).refine((value) => value.length > 0, {
    message: "You must select at least one content type.",
  }),
  blogPostTitle: z.string().optional(),
  socialPlatforms: z.array(z.string()).optional(),
  socialPostCount: z.string().optional(),
  generateImages: z.boolean().default(false),
  generateAudio: z.boolean().default(false),
  aiServices: z
    .object({
      useOpenAi: z.boolean().default(true),
      useMidjourney: z.boolean().default(false),
      useElevenLabs: z.boolean().default(false),
      useFluxApi: z.boolean().default(false),
    })
    .optional(),
})

const products = [
  { value: "kartra", label: "Kartra" },
  { value: "clickfunnels", label: "ClickFunnels" },
  { value: "convertkit", label: "ConvertKit" },
  { value: "teachable", label: "Teachable" },
  { value: "kajabi", label: "Kajabi" },
]

const contentTypes = [
  { id: "blog_post", label: "Blog Post" },
  { id: "product_review", label: "Product Review" },
  { id: "comparison", label: "Comparison" },
  { id: "social_posts", label: "Social Media Posts" },
]

const socialPlatforms = [
  { id: "twitter", label: "Twitter" },
  { id: "facebook", label: "Facebook" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "instagram", label: "Instagram" },
]

export function ContentGenerationForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("content")
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contentTypes: [],
      socialPlatforms: [],
      generateImages: true,
      generateAudio: false,
      aiServices: {
        useOpenAi: true,
        useMidjourney: false,
        useElevenLabs: false,
        useFluxApi: false,
      },
    },
  })

  const watchContentTypes = form.watch("contentTypes")
  const showBlogOptions = watchContentTypes.includes("blog_post")
  const showSocialOptions = watchContentTypes.includes("social_posts")
  const watchGenerateImages = form.watch("generateImages")
  const watchGenerateAudio = form.watch("generateAudio")

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Content generation started",
        description: `We're generating content for ${values.product}. This may take a few minutes.`,
      })
      router.push("/dashboard/content")
    }, 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate Content</CardTitle>
        <CardDescription>Create AI-generated content for your affiliate products.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="media" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              Media
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <Mic className="h-4 w-4" />
              AI Services
            </TabsTrigger>
          </TabsList>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <TabsContent value="content" className="space-y-6">
                <FormField
                  control={form.control}
                  name="product"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a product" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {products.map((product) => (
                            <SelectItem key={product.value} value={product.value}>
                              {product.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>Select the product you want to generate content for.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contentTypes"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel>Content Types</FormLabel>
                        <FormDescription>Select the types of content you want to generate.</FormDescription>
                      </div>
                      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        {contentTypes.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="contentTypes"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item.id}
                                  className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, item.id])
                                          : field.onChange(field.value?.filter((value) => value !== item.id))
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">{item.label}</FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {showBlogOptions && (
                  <FormField
                    control={form.control}
                    name="blogPostTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Blog Post Title (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 10 Ways to Boost Your Business with Kartra" {...field} />
                        </FormControl>
                        <FormDescription>Leave blank to generate a title automatically.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {showSocialOptions && (
                  <>
                    <FormField
                      control={form.control}
                      name="socialPlatforms"
                      render={() => (
                        <FormItem>
                          <div className="mb-4">
                            <FormLabel>Social Platforms</FormLabel>
                            <FormDescription>
                              Select the social media platforms to generate content for.
                            </FormDescription>
                          </div>
                          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                            {socialPlatforms.map((platform) => (
                              <FormField
                                key={platform.id}
                                control={form.control}
                                name="socialPlatforms"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={platform.id}
                                      className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(platform.id)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...field.value, platform.id])
                                              : field.onChange(field.value?.filter((value) => value !== platform.id))
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal">{platform.label}</FormLabel>
                                    </FormItem>
                                  )
                                }}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="socialPostCount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Posts Per Platform</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value || "3"}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select number of posts" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1">1 post</SelectItem>
                              <SelectItem value="3">3 posts</SelectItem>
                              <SelectItem value="5">5 posts</SelectItem>
                              <SelectItem value="10">10 posts</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>Number of posts to generate for each selected platform.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </TabsContent>

              <TabsContent value="media" className="space-y-6">
                <FormField
                  control={form.control}
                  name="generateImages"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Generate Images</FormLabel>
                        <FormDescription>Generate images to accompany the content using Midjourney.</FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                {watchGenerateImages && (
                  <div className="ml-7 space-y-4">
                    <div>
                      <FormLabel>Image Style</FormLabel>
                      <Select defaultValue="professional">
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select image style" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="minimalist">Minimalist</SelectItem>
                          <SelectItem value="vibrant">Vibrant</SelectItem>
                          <SelectItem value="artistic">Artistic</SelectItem>
                          <SelectItem value="photorealistic">Photorealistic</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Choose the visual style for generated images.</FormDescription>
                    </div>

                    <div>
                      <FormLabel>Image Types</FormLabel>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="featured" defaultChecked />
                          <label
                            htmlFor="featured"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Featured Images
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="social" defaultChecked />
                          <label
                            htmlFor="social"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Social Media
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="product" defaultChecked />
                          <label
                            htmlFor="product"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Product Showcase
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="comparison" />
                          <label
                            htmlFor="comparison"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Comparison Charts
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <FormField
                  control={form.control}
                  name="generateAudio"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Generate Audio</FormLabel>
                        <FormDescription>Generate audio versions of blog posts using Eleven Labs.</FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                {watchGenerateAudio && (
                  <div className="ml-7 space-y-4">
                    <div>
                      <FormLabel>Voice Selection</FormLabel>
                      <Select defaultValue="voice1">
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select voice" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="voice1">Adam (Male)</SelectItem>
                          <SelectItem value="voice2">Bella (Female)</SelectItem>
                          <SelectItem value="voice3">Charlie (Male)</SelectItem>
                          <SelectItem value="voice4">Diana (Female)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Choose the voice for audio narration.</FormDescription>
                    </div>

                    <div>
                      <FormLabel>Audio Format</FormLabel>
                      <Select defaultValue="mp3">
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select format" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="mp3">MP3</SelectItem>
                          <SelectItem value="wav">WAV</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Choose the audio file format.</FormDescription>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="ai" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">AI Services</h3>
                  <p className="text-sm text-muted-foreground">
                    Select which AI services to use for content generation. You can configure these services in the
                    Settings.
                  </p>

                  <FormField
                    control={form.control}
                    name="aiServices.useOpenAi"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>OpenAI</FormLabel>
                          <FormDescription>Use OpenAI for text content generation.</FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="aiServices.useMidjourney"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Midjourney</FormLabel>
                          <FormDescription>Use Midjourney for image generation.</FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="aiServices.useElevenLabs"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Eleven Labs</FormLabel>
                          <FormDescription>Use Eleven Labs for audio generation.</FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="aiServices.useFluxApi"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Flux API</FormLabel>
                          <FormDescription>Use Flux API for advanced AI workflows.</FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              <div className="flex justify-end">
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Generate Content
                </Button>
              </div>
            </form>
          </Form>
        </Tabs>
      </CardContent>
    </Card>
  )
}

