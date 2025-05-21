"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Plus, X } from "lucide-react"

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  product: z.string({
    required_error: "Please select a product.",
  }),
  type: z.string({
    required_error: "Please select a lead magnet type.",
  }),
  generateLandingPage: z.boolean().default(true),
  items: z.array(z.string()).optional(),
})

const products = [
  { value: "kartra", label: "Kartra" },
  { value: "clickfunnels", label: "ClickFunnels" },
  { value: "convertkit", label: "ConvertKit" },
  { value: "teachable", label: "Teachable" },
  { value: "kajabi", label: "Kajabi" },
]

const leadMagnetTypes = [
  { value: "checklist", label: "Checklist" },
  { value: "ebook", label: "eBook" },
  { value: "guide", label: "Guide" },
  { value: "templates", label: "Templates" },
  { value: "swipe_file", label: "Swipe File" },
  { value: "cheat_sheet", label: "Cheat Sheet" },
]

export function LeadMagnetForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [items, setItems] = useState<string[]>([
    "Set up your account and complete your profile",
    "Define your target audience and customer avatar",
    "Create your first landing page for lead capture",
  ])
  const [newItem, setNewItem] = useState("")
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      generateLandingPage: true,
      items: items,
    },
  })

  const watchType = form.watch("type")
  const showItems = watchType === "checklist" || watchType === "cheat_sheet"

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    // Include items in the form values
    if (showItems) {
      values.items = items
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Lead magnet created",
        description: `${values.title} has been created successfully.`,
      })
      router.push("/dashboard/leads")
    }, 1500)
  }

  function addItem() {
    if (newItem.trim() !== "") {
      setItems([...items, newItem])
      setNewItem("")
    }
  }

  function removeItem(index: number) {
    const newItems = [...items]
    newItems.splice(index, 1)
    setItems(newItems)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Lead Magnet</CardTitle>
        <CardDescription>Create a new lead magnet to capture leads for your affiliate products.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. The Ultimate Guide to Marketing Automation" {...field} />
                  </FormControl>
                  <FormDescription>The title of your lead magnet.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                    <FormDescription>The product this lead magnet is for.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {leadMagnetTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>The type of lead magnet you want to create.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe your lead magnet..." className="min-h-[120px]" {...field} />
                  </FormControl>
                  <FormDescription>A brief description of what your lead magnet offers.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {showItems && (
              <div className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <FormLabel>Items</FormLabel>
                  <FormDescription>Add items to your checklist or cheat sheet.</FormDescription>
                </div>

                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={item}
                        onChange={(e) => {
                          const newItems = [...items]
                          newItems[index] = e.target.value
                          setItems(newItems)
                        }}
                      />
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeItem(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Add a new item..."
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addItem()
                      }
                    }}
                  />
                  <Button type="button" variant="outline" size="icon" onClick={addItem}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            <FormField
              control={form.control}
              name="generateLandingPage"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Generate Landing Page</FormLabel>
                    <FormDescription>Automatically create a landing page for this lead magnet.</FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Lead Magnet
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

