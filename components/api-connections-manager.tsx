"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Loader2, Image, MessageSquare, Mic, Workflow } from "lucide-react"
import { useApi } from "@/lib/api-context"

// API connection schemas
const openAiSchema = z.object({
  apiKey: z.string().min(1, "API key is required"),
  model: z.string().min(1, "Model is required"),
  enabled: z.boolean().default(true),
})

const midjourneySchema = z.object({
  apiKey: z.string().min(1, "API key is required"),
  enabled: z.boolean().default(true),
})

const elevenLabsSchema = z.object({
  apiKey: z.string().min(1, "API key is required"),
  voiceId: z.string().optional(),
  enabled: z.boolean().default(true),
})

const fluxApiSchema = z.object({
  apiKey: z.string().min(1, "API key is required"),
  workflowId: z.string().optional(),
  enabled: z.boolean().default(true),
})

// Sample models and voices for dropdowns
const openAiModels = [
  { value: "gpt-4o", label: "GPT-4o" },
  { value: "gpt-4-turbo", label: "GPT-4 Turbo" },
  { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
]

const elevenLabsVoices = [
  { value: "voice1", label: "Adam (Male)" },
  { value: "voice2", label: "Bella (Female)" },
  { value: "voice3", label: "Charlie (Male)" },
  { value: "voice4", label: "Diana (Female)" },
]

export function ApiConnectionsManager() {
  const { aiServicesConnected, connectAiService } = useApi()
  const [isTestingOpenAi, setIsTestingOpenAi] = useState(false)
  const [isTestingMidjourney, setIsTestingMidjourney] = useState(false)
  const [isTestingElevenLabs, setIsTestingElevenLabs] = useState(false)
  const [isTestingFluxApi, setIsTestingFluxApi] = useState(false)

  // OpenAI form
  const openAiForm = useForm<z.infer<typeof openAiSchema>>({
    resolver: zodResolver(openAiSchema),
    defaultValues: {
      apiKey: "",
      model: "gpt-4o",
      enabled: aiServicesConnected.openai,
    },
  })

  // Midjourney form
  const midjourneyForm = useForm<z.infer<typeof midjourneySchema>>({
    resolver: zodResolver(midjourneySchema),
    defaultValues: {
      apiKey: "",
      enabled: aiServicesConnected.midjourney,
    },
  })

  // Eleven Labs form
  const elevenLabsForm = useForm<z.infer<typeof elevenLabsSchema>>({
    resolver: zodResolver(elevenLabsSchema),
    defaultValues: {
      apiKey: "",
      voiceId: "voice1",
      enabled: aiServicesConnected.elevenLabs,
    },
  })

  // Flux API form
  const fluxApiForm = useForm<z.infer<typeof fluxApiSchema>>({
    resolver: zodResolver(fluxApiSchema),
    defaultValues: {
      apiKey: "",
      workflowId: "",
      enabled: aiServicesConnected.fluxApi,
    },
  })

  // Form submission handlers
  function onOpenAiSubmit(values: z.infer<typeof openAiSchema>) {
    connectAiService("openai", values.enabled)
    toast({
      title: "OpenAI API settings saved",
      description: `Connected to OpenAI using model: ${values.model}`,
    })
  }

  function onMidjourneySubmit(values: z.infer<typeof midjourneySchema>) {
    connectAiService("midjourney", values.enabled)
    toast({
      title: "Midjourney API settings saved",
      description: "Connected to Midjourney API successfully",
    })
  }

  function onElevenLabsSubmit(values: z.infer<typeof elevenLabsSchema>) {
    connectAiService("elevenLabs", values.enabled)
    toast({
      title: "Eleven Labs API settings saved",
      description: `Connected to Eleven Labs using voice: ${values.voiceId || "Default"}`,
    })
  }

  function onFluxApiSubmit(values: z.infer<typeof fluxApiSchema>) {
    connectAiService("fluxApi", values.enabled)
    toast({
      title: "Flux API settings saved",
      description: "Connected to Flux API successfully",
    })
  }

  // Test connection handlers
  function testOpenAiConnection() {
    setIsTestingOpenAi(true)

    // Simulate API test
    setTimeout(() => {
      setIsTestingOpenAi(false)
      connectAiService("openai", true)
      toast({
        title: "OpenAI connection successful",
        description: "Successfully connected to OpenAI API",
      })
    }, 1500)
  }

  function testMidjourneyConnection() {
    setIsTestingMidjourney(true)

    // Simulate API test
    setTimeout(() => {
      setIsTestingMidjourney(false)
      connectAiService("midjourney", true)
      toast({
        title: "Midjourney connection successful",
        description: "Successfully connected to Midjourney API",
      })
    }, 1500)
  }

  function testElevenLabsConnection() {
    setIsTestingElevenLabs(true)

    // Simulate API test
    setTimeout(() => {
      setIsTestingElevenLabs(false)
      connectAiService("elevenLabs", true)
      toast({
        title: "Eleven Labs connection successful",
        description: "Successfully connected to Eleven Labs API",
      })
    }, 1500)
  }

  function testFluxApiConnection() {
    setIsTestingFluxApi(true)

    // Simulate API test
    setTimeout(() => {
      setIsTestingFluxApi(false)
      connectAiService("fluxApi", true)
      toast({
        title: "Flux API connection successful",
        description: "Successfully connected to Flux API",
      })
    }, 1500)
  }

  return (
    <Tabs defaultValue="openai" className="space-y-6">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="openai" className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          <span className="hidden sm:inline">OpenAI</span>
        </TabsTrigger>
        <TabsTrigger value="midjourney" className="flex items-center gap-2">
          <Image className="h-4 w-4" />
          <span className="hidden sm:inline">Midjourney</span>
        </TabsTrigger>
        <TabsTrigger value="elevenlabs" className="flex items-center gap-2">
          <Mic className="h-4 w-4" />
          <span className="hidden sm:inline">Eleven Labs</span>
        </TabsTrigger>
        <TabsTrigger value="fluxapi" className="flex items-center gap-2">
          <Workflow className="h-4 w-4" />
          <span className="hidden sm:inline">Flux API</span>
        </TabsTrigger>
      </TabsList>

      {/* OpenAI Tab */}
      <TabsContent value="openai">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              OpenAI Integration
            </CardTitle>
            <CardDescription>
              Connect to OpenAI API for text generation, including blog posts, product descriptions, and social media
              content.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...openAiForm}>
              <form onSubmit={openAiForm.handleSubmit(onOpenAiSubmit)} className="space-y-6">
                <FormField
                  control={openAiForm.control}
                  name="enabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Enable OpenAI Integration</FormLabel>
                        <FormDescription>
                          When enabled, the system will use OpenAI for content generation.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={openAiForm.control}
                  name="apiKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>OpenAI API Key</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="sk-..." {...field} />
                      </FormControl>
                      <FormDescription>Your OpenAI API key. This will be stored securely.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={openAiForm.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Model</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a model" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {openAiModels.map((model) => (
                            <SelectItem key={model.value} value={model.value}>
                              {model.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>Select which OpenAI model to use for content generation.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="advanced">
                    <AccordionTrigger>Advanced Settings</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium">Temperature</label>
                            <Input type="number" min="0" max="2" step="0.1" defaultValue="0.7" />
                            <p className="text-xs text-muted-foreground mt-1">Controls randomness (0-2)</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Max Tokens</label>
                            <Input type="number" min="100" max="4000" step="100" defaultValue="1000" />
                            <p className="text-xs text-muted-foreground mt-1">Maximum response length</p>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium">System Prompt</label>
                          <Input defaultValue="You are a helpful marketing assistant that writes engaging content." />
                          <p className="text-xs text-muted-foreground mt-1">Default system instructions</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={testOpenAiConnection} disabled={isTestingOpenAi}>
              {isTestingOpenAi ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Testing...
                </>
              ) : (
                <>Test Connection</>
              )}
            </Button>
            <Button onClick={openAiForm.handleSubmit(onOpenAiSubmit)}>Save Settings</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      {/* Midjourney Tab */}
      <TabsContent value="midjourney">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image className="h-5 w-5" />
              Midjourney Integration
            </CardTitle>
            <CardDescription>
              Connect to Midjourney API for generating high-quality images for your blog posts, social media, and
              product visuals.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...midjourneyForm}>
              <form onSubmit={midjourneyForm.handleSubmit(onMidjourneySubmit)} className="space-y-6">
                <FormField
                  control={midjourneyForm.control}
                  name="enabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Enable Midjourney Integration</FormLabel>
                        <FormDescription>
                          When enabled, the system will use Midjourney for image generation.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={midjourneyForm.control}
                  name="apiKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Midjourney API Key</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter your API key" {...field} />
                      </FormControl>
                      <FormDescription>Your Midjourney API key. This will be stored securely.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="advanced">
                    <AccordionTrigger>Advanced Settings</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium">Default Style</label>
                            <Select defaultValue="vivid">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="vivid">Vivid</SelectItem>
                                <SelectItem value="natural">Natural</SelectItem>
                                <SelectItem value="raw">Raw</SelectItem>
                              </SelectContent>
                            </Select>
                            <p className="text-xs text-muted-foreground mt-1">Default image style</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Default Quality</label>
                            <Select defaultValue="standard">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="standard">Standard</SelectItem>
                                <SelectItem value="hd">HD</SelectItem>
                              </SelectContent>
                            </Select>
                            <p className="text-xs text-muted-foreground mt-1">Image quality setting</p>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Default Aspect Ratio</label>
                          <Select defaultValue="1:1">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1:1">Square (1:1)</SelectItem>
                              <SelectItem value="16:9">Landscape (16:9)</SelectItem>
                              <SelectItem value="9:16">Portrait (9:16)</SelectItem>
                              <SelectItem value="4:3">Standard (4:3)</SelectItem>
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-muted-foreground mt-1">Default image dimensions</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={testMidjourneyConnection} disabled={isTestingMidjourney}>
              {isTestingMidjourney ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Testing...
                </>
              ) : (
                <>Test Connection</>
              )}
            </Button>
            <Button onClick={midjourneyForm.handleSubmit(onMidjourneySubmit)}>Save Settings</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      {/* Eleven Labs Tab */}
      <TabsContent value="elevenlabs">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mic className="h-5 w-5" />
              Eleven Labs Integration
            </CardTitle>
            <CardDescription>
              Connect to Eleven Labs API for generating realistic voice-overs and audio content for your marketing
              materials.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...elevenLabsForm}>
              <form onSubmit={elevenLabsForm.handleSubmit(onElevenLabsSubmit)} className="space-y-6">
                <FormField
                  control={elevenLabsForm.control}
                  name="enabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Enable Eleven Labs Integration</FormLabel>
                        <FormDescription>
                          When enabled, the system will use Eleven Labs for voice generation.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={elevenLabsForm.control}
                  name="apiKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Eleven Labs API Key</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter your API key" {...field} />
                      </FormControl>
                      <FormDescription>Your Eleven Labs API key. This will be stored securely.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={elevenLabsForm.control}
                  name="voiceId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Default Voice</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a voice" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {elevenLabsVoices.map((voice) => (
                            <SelectItem key={voice.value} value={voice.value}>
                              {voice.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>Select which voice to use for audio generation.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="advanced">
                    <AccordionTrigger>Advanced Settings</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium">Stability</label>
                            <Input type="number" min="0" max="1" step="0.1" defaultValue="0.5" />
                            <p className="text-xs text-muted-foreground mt-1">Voice stability (0-1)</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Clarity</label>
                            <Input type="number" min="0" max="1" step="0.1" defaultValue="0.75" />
                            <p className="text-xs text-muted-foreground mt-1">Voice clarity (0-1)</p>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Output Format</label>
                          <Select defaultValue="mp3">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mp3">MP3</SelectItem>
                              <SelectItem value="wav">WAV</SelectItem>
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-muted-foreground mt-1">Audio file format</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={testElevenLabsConnection} disabled={isTestingElevenLabs}>
              {isTestingElevenLabs ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Testing...
                </>
              ) : (
                <>Test Connection</>
              )}
            </Button>
            <Button onClick={elevenLabsForm.handleSubmit(onElevenLabsSubmit)}>Save Settings</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      {/* Flux API Tab */}
      <TabsContent value="fluxapi">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Workflow className="h-5 w-5" />
              Flux API Integration
            </CardTitle>
            <CardDescription>
              Connect to Flux API for advanced AI workflows and automation of complex marketing tasks.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...fluxApiForm}>
              <form onSubmit={fluxApiForm.handleSubmit(onFluxApiSubmit)} className="space-y-6">
                <FormField
                  control={fluxApiForm.control}
                  name="enabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Enable Flux API Integration</FormLabel>
                        <FormDescription>
                          When enabled, the system will use Flux API for advanced AI workflows.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={fluxApiForm.control}
                  name="apiKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Flux API Key</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter your API key" {...field} />
                      </FormControl>
                      <FormDescription>Your Flux API key. This will be stored securely.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={fluxApiForm.control}
                  name="workflowId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Default Workflow ID (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter workflow ID" {...field} />
                      </FormControl>
                      <FormDescription>Optional: Specify a default workflow ID to use.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="advanced">
                    <AccordionTrigger>Advanced Settings</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="grid gap-4">
                        <div>
                          <label className="text-sm font-medium">Webhook URL</label>
                          <Input defaultValue="https://example.com/api/flux-webhook" />
                          <p className="text-xs text-muted-foreground mt-1">URL for receiving webhook notifications</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Default Parameters</label>
                          <Input defaultValue='{"max_iterations": 3, "feedback_enabled": true}' />
                          <p className="text-xs text-muted-foreground mt-1">Default JSON parameters for workflows</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={testFluxApiConnection} disabled={isTestingFluxApi}>
              {isTestingFluxApi ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Testing...
                </>
              ) : (
                <>Test Connection</>
              )}
            </Button>
            <Button onClick={fluxApiForm.handleSubmit(onFluxApiSubmit)}>Save Settings</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

