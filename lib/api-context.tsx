"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import { toast } from "@/components/ui/use-toast"

// Define types for our API data
export type Product = {
  id: number
  name: string
  category: string
  commission: string
  status: string
  dateAdded: string
  revenue: string
}

export type ContentItem = {
  id: number
  title: string
  type: string
  product: string
  status: string
  dateCreated: string
  platform: string
}

export type ScheduleItem = {
  id: number
  title: string
  date: Date
  platform: string
  contentType: string
  status: string
}

export type LeadMagnet = {
  id: number
  title: string
  type: string
  product: string
  status: string
  dateCreated: string
  downloads: number
}

export type ApiStatus = "idle" | "loading" | "success" | "error"

// Define the context type
type ApiContextType = {
  // Products
  products: Product[]
  addProduct: (product: Omit<Product, "id" | "revenue" | "dateAdded">) => Promise<Product>
  updateProduct: (id: number, product: Partial<Product>) => Promise<Product>
  deleteProduct: (id: number) => Promise<boolean>
  productsStatus: ApiStatus

  // Content
  contentItems: ContentItem[]
  addContentItem: (item: Omit<ContentItem, "id" | "dateCreated">) => Promise<ContentItem>
  updateContentItem: (id: number, item: Partial<ContentItem>) => Promise<ContentItem>
  deleteContentItem: (id: number) => Promise<boolean>
  contentStatus: ApiStatus

  // Schedules
  scheduleItems: ScheduleItem[]
  addScheduleItem: (item: Omit<ScheduleItem, "id">) => Promise<ScheduleItem>
  updateScheduleItem: (id: number, item: Partial<ScheduleItem>) => Promise<ScheduleItem>
  deleteScheduleItem: (id: number) => Promise<boolean>
  scheduleStatus: ApiStatus

  // Lead Magnets
  leadMagnets: LeadMagnet[]
  addLeadMagnet: (item: Omit<LeadMagnet, "id" | "downloads" | "dateCreated">) => Promise<LeadMagnet>
  updateLeadMagnet: (id: number, item: Partial<LeadMagnet>) => Promise<LeadMagnet>
  deleteLeadMagnet: (id: number) => Promise<boolean>
  leadMagnetsStatus: ApiStatus

  // AI Services
  aiServicesConnected: {
    openai: boolean
    midjourney: boolean
    elevenLabs: boolean
    fluxApi: boolean
  }
  connectAiService: (service: keyof typeof aiServicesConnected, connected: boolean) => void
}

// Sample data
const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Kartra",
    category: "Marketing Automation",
    commission: "40%",
    status: "active",
    dateAdded: "2023-10-15",
    revenue: "$2,450.00",
  },
  {
    id: 2,
    name: "ClickFunnels",
    category: "Sales Funnels",
    commission: "35%",
    status: "active",
    dateAdded: "2023-11-02",
    revenue: "$1,875.50",
  },
  {
    id: 3,
    name: "ConvertKit",
    category: "Email Marketing",
    commission: "30%",
    status: "active",
    dateAdded: "2023-12-10",
    revenue: "$950.25",
  },
  {
    id: 4,
    name: "Teachable",
    category: "Online Courses",
    commission: "45%",
    status: "inactive",
    dateAdded: "2024-01-05",
    revenue: "$0.00",
  },
  {
    id: 5,
    name: "Kajabi",
    category: "All-in-One Platform",
    commission: "30%",
    status: "active",
    dateAdded: "2024-02-18",
    revenue: "$725.80",
  },
]

const sampleContentItems: ContentItem[] = [
  {
    id: 1,
    title: "Why Kartra is the Best Marketing Tool in 2025",
    type: "blog_post",
    product: "Kartra",
    status: "published",
    dateCreated: "2024-03-15",
    platform: "WordPress",
  },
  {
    id: 2,
    title: "10 Ways Kartra Can Automate Your Business",
    type: "blog_post",
    product: "Kartra",
    status: "draft",
    dateCreated: "2024-03-18",
    platform: "WordPress",
  },
  {
    id: 3,
    title: "Just discovered how Kartra can 10x your marketing results!",
    type: "social_post",
    product: "Kartra",
    status: "scheduled",
    dateCreated: "2024-03-20",
    platform: "Twitter",
  },
  {
    id: 4,
    title: "Kartra vs ClickFunnels: Which is Better?",
    type: "comparison",
    product: "Kartra",
    status: "published",
    dateCreated: "2024-03-22",
    platform: "WordPress",
  },
  {
    id: 5,
    title: "Transform your business with Kartra's automation features",
    type: "social_post",
    product: "Kartra",
    status: "scheduled",
    dateCreated: "2024-03-25",
    platform: "LinkedIn",
  },
]

const sampleScheduleItems: ScheduleItem[] = [
  {
    id: 1,
    title: "Why Kartra is the Best Marketing Tool in 2025",
    date: new Date(2024, 3, 15),
    platform: "WordPress",
    contentType: "blog_post",
    status: "published",
  },
  {
    id: 2,
    title: "10 Ways Kartra Can Automate Your Business",
    date: new Date(2024, 3, 18),
    platform: "WordPress",
    contentType: "blog_post",
    status: "scheduled",
  },
  {
    id: 3,
    title: "Just discovered how Kartra can 10x your marketing results!",
    date: new Date(2024, 3, 20),
    platform: "Twitter",
    contentType: "social_post",
    status: "scheduled",
  },
  {
    id: 4,
    title: "Transform your business with Kartra's automation features",
    date: new Date(2024, 3, 22),
    platform: "LinkedIn",
    contentType: "social_post",
    status: "scheduled",
  },
  {
    id: 5,
    title: "Kartra vs ClickFunnels: Which is Better?",
    date: new Date(2024, 3, 25),
    platform: "WordPress",
    contentType: "comparison",
    status: "scheduled",
  },
]

const sampleLeadMagnets: LeadMagnet[] = [
  {
    id: 1,
    title: "The Kartra Setup Checklist",
    type: "checklist",
    product: "Kartra",
    status: "active",
    dateCreated: "2024-03-10",
    downloads: 127,
  },
  {
    id: 2,
    title: "The Ultimate Guide to Marketing Automation with Kartra",
    type: "ebook",
    product: "Kartra",
    status: "active",
    dateCreated: "2024-03-15",
    downloads: 89,
  },
  {
    id: 3,
    title: "How to Create a High-Converting Sales Funnel with Kartra",
    type: "guide",
    product: "Kartra",
    status: "active",
    dateCreated: "2024-03-20",
    downloads: 64,
  },
  {
    id: 4,
    title: "ClickFunnels vs Kartra: Which is Right for You?",
    type: "comparison",
    product: "Kartra",
    status: "draft",
    dateCreated: "2024-03-25",
    downloads: 0,
  },
  {
    id: 5,
    title: "10 Email Templates for Kartra",
    type: "templates",
    product: "Kartra",
    status: "active",
    dateCreated: "2024-03-28",
    downloads: 42,
  },
]

// Create the context
const ApiContext = createContext<ApiContextType | undefined>(undefined)

// Simulate API delay
const simulateApiCall = async <T,>(data: T, errorChance = 0): Promise<T> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate random API errors for testing error handling
      if (Math.random() < errorChance) {
        reject(new Error("API Error: Something went wrong"))
      } else {
        resolve(data)
      }
    }, 500) // Simulate network delay
  })
}

// Provider component
export function ApiProvider({ children }: { children: React.ReactNode }) {
  // State for data
  const [products, setProducts] = useState<Product[]>(sampleProducts)
  const [contentItems, setContentItems] = useState<ContentItem[]>(sampleContentItems)
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>(sampleScheduleItems)
  const [leadMagnets, setLeadMagnets] = useState<LeadMagnet[]>(sampleLeadMagnets)

  // State for API status
  const [productsStatus, setProductsStatus] = useState<ApiStatus>("idle")
  const [contentStatus, setContentStatus] = useState<ApiStatus>("idle")
  const [scheduleStatus, setScheduleStatus] = useState<ApiStatus>("idle")
  const [leadMagnetsStatus, setLeadMagnetsStatus] = useState<ApiStatus>("idle")

  // State for AI services
  const [aiServicesConnected, setAiServicesConnected] = useState({
    openai: false,
    midjourney: false,
    elevenLabs: false,
    fluxApi: false,
  })

  // Error handling function
  const handleApiError = (error: Error, operation: string) => {
    console.error(`Error during ${operation}:`, error)
    toast({
      title: "Operation Failed",
      description: error.message || `There was an error during ${operation}. Please try again.`,
      variant: "destructive",
    })
  }

  // Products CRUD
  const addProduct = async (product: Omit<Product, "id" | "revenue" | "dateAdded">): Promise<Product> => {
    try {
      setProductsStatus("loading")

      // Create new product with generated fields
      const newProduct: Product = {
        ...product,
        id: products.length + 1,
        revenue: "$0.00",
        dateAdded: new Date().toISOString().split("T")[0],
      }

      // Simulate API call
      await simulateApiCall(newProduct, 0.1) // 10% chance of error for testing

      // Update state optimistically
      setProducts((prev) => [...prev, newProduct])
      setProductsStatus("success")

      toast({
        title: "Product Added",
        description: `${newProduct.name} has been added successfully.`,
      })

      return newProduct
    } catch (error) {
      setProductsStatus("error")
      handleApiError(error as Error, "adding product")
      throw error
    }
  }

  const updateProduct = async (id: number, product: Partial<Product>): Promise<Product> => {
    try {
      setProductsStatus("loading")

      // Find product to update
      const productIndex = products.findIndex((p) => p.id === id)
      if (productIndex === -1) {
        throw new Error(`Product with ID ${id} not found`)
      }

      // Create updated product
      const updatedProduct = {
        ...products[productIndex],
        ...product,
      }

      // Simulate API call
      await simulateApiCall(updatedProduct, 0.1)

      // Update state optimistically
      const newProducts = [...products]
      newProducts[productIndex] = updatedProduct
      setProducts(newProducts)
      setProductsStatus("success")

      toast({
        title: "Product Updated",
        description: `${updatedProduct.name} has been updated successfully.`,
      })

      return updatedProduct
    } catch (error) {
      setProductsStatus("error")
      handleApiError(error as Error, "updating product")
      throw error
    }
  }

  const deleteProduct = async (id: number): Promise<boolean> => {
    try {
      setProductsStatus("loading")

      // Find product to delete
      const productIndex = products.findIndex((p) => p.id === id)
      if (productIndex === -1) {
        throw new Error(`Product with ID ${id} not found`)
      }

      const productName = products[productIndex].name

      // Simulate API call
      await simulateApiCall(true, 0.1)

      // Update state optimistically
      setProducts((prev) => prev.filter((p) => p.id !== id))
      setProductsStatus("success")

      toast({
        title: "Product Deleted",
        description: `${productName} has been deleted successfully.`,
      })

      return true
    } catch (error) {
      setProductsStatus("error")
      handleApiError(error as Error, "deleting product")
      throw error
    }
  }

  // Content CRUD
  const addContentItem = async (item: Omit<ContentItem, "id" | "dateCreated">): Promise<ContentItem> => {
    try {
      setContentStatus("loading")

      // Create new content item with generated fields
      const newItem: ContentItem = {
        ...item,
        id: contentItems.length + 1,
        dateCreated: new Date().toISOString().split("T")[0],
      }

      // Simulate API call
      await simulateApiCall(newItem, 0.1)

      // Update state optimistically
      setContentItems((prev) => [...prev, newItem])
      setContentStatus("success")

      toast({
        title: "Content Added",
        description: `${newItem.title} has been added successfully.`,
      })

      return newItem
    } catch (error) {
      setContentStatus("error")
      handleApiError(error as Error, "adding content")
      throw error
    }
  }

  const updateContentItem = async (id: number, item: Partial<ContentItem>): Promise<ContentItem> => {
    try {
      setContentStatus("loading")

      // Find content to update
      const itemIndex = contentItems.findIndex((c) => c.id === id)
      if (itemIndex === -1) {
        throw new Error(`Content with ID ${id} not found`)
      }

      // Create updated content
      const updatedItem = {
        ...contentItems[itemIndex],
        ...item,
      }

      // Simulate API call
      await simulateApiCall(updatedItem, 0.1)

      // Update state optimistically
      const newItems = [...contentItems]
      newItems[itemIndex] = updatedItem
      setContentItems(newItems)
      setContentStatus("success")

      toast({
        title: "Content Updated",
        description: `${updatedItem.title} has been updated successfully.`,
      })

      return updatedItem
    } catch (error) {
      setContentStatus("error")
      handleApiError(error as Error, "updating content")
      throw error
    }
  }

  const deleteContentItem = async (id: number): Promise<boolean> => {
    try {
      setContentStatus("loading")

      // Find content to delete
      const itemIndex = contentItems.findIndex((c) => c.id === id)
      if (itemIndex === -1) {
        throw new Error(`Content with ID ${id} not found`)
      }

      const itemTitle = contentItems[itemIndex].title

      // Simulate API call
      await simulateApiCall(true, 0.1)

      // Update state optimistically
      setContentItems((prev) => prev.filter((c) => c.id !== id))
      setContentStatus("success")

      toast({
        title: "Content Deleted",
        description: `${itemTitle} has been deleted successfully.`,
      })

      return true
    } catch (error) {
      setContentStatus("error")
      handleApiError(error as Error, "deleting content")
      throw error
    }
  }

  // Schedule CRUD
  const addScheduleItem = async (item: Omit<ScheduleItem, "id">): Promise<ScheduleItem> => {
    try {
      setScheduleStatus("loading")

      // Create new schedule item with generated ID
      const newItem: ScheduleItem = {
        ...item,
        id: scheduleItems.length + 1,
      }

      // Simulate API call
      await simulateApiCall(newItem, 0.1)

      // Update state optimistically
      setScheduleItems((prev) => [...prev, newItem])
      setScheduleStatus("success")

      toast({
        title: "Schedule Added",
        description: `${newItem.title} has been scheduled successfully.`,
      })

      return newItem
    } catch (error) {
      setScheduleStatus("error")
      handleApiError(error as Error, "adding schedule")
      throw error
    }
  }

  const updateScheduleItem = async (id: number, item: Partial<ScheduleItem>): Promise<ScheduleItem> => {
    try {
      setScheduleStatus("loading")

      // Find schedule to update
      const itemIndex = scheduleItems.findIndex((s) => s.id === id)
      if (itemIndex === -1) {
        throw new Error(`Schedule with ID ${id} not found`)
      }

      // Create updated schedule
      const updatedItem = {
        ...scheduleItems[itemIndex],
        ...item,
      }

      // Simulate API call
      await simulateApiCall(updatedItem, 0.1)

      // Update state optimistically
      const newItems = [...scheduleItems]
      newItems[itemIndex] = updatedItem
      setScheduleItems(newItems)
      setScheduleStatus("success")

      toast({
        title: "Schedule Updated",
        description: `${updatedItem.title} has been updated successfully.`,
      })

      return updatedItem
    } catch (error) {
      setScheduleStatus("error")
      handleApiError(error as Error, "updating schedule")
      throw error
    }
  }

  const deleteScheduleItem = async (id: number): Promise<boolean> => {
    try {
      setScheduleStatus("loading")

      // Find schedule to delete
      const itemIndex = scheduleItems.findIndex((s) => s.id === id)
      if (itemIndex === -1) {
        throw new Error(`Schedule with ID ${id} not found`)
      }

      const itemTitle = scheduleItems[itemIndex].title

      // Simulate API call
      await simulateApiCall(true, 0.1)

      // Update state optimistically
      setScheduleItems((prev) => prev.filter((s) => s.id !== id))
      setScheduleStatus("success")

      toast({
        title: "Schedule Deleted",
        description: `${itemTitle} has been removed from the schedule.`,
      })

      return true
    } catch (error) {
      setScheduleStatus("error")
      handleApiError(error as Error, "deleting schedule")
      throw error
    }
  }

  // Lead Magnets CRUD
  const addLeadMagnet = async (item: Omit<LeadMagnet, "id" | "downloads" | "dateCreated">): Promise<LeadMagnet> => {
    try {
      setLeadMagnetsStatus("loading")

      // Create new lead magnet with generated fields
      const newItem: LeadMagnet = {
        ...item,
        id: leadMagnets.length + 1,
        downloads: 0,
        dateCreated: new Date().toISOString().split("T")[0],
      }

      // Simulate API call
      await simulateApiCall(newItem, 0.1)

      // Update state optimistically
      setLeadMagnets((prev) => [...prev, newItem])
      setLeadMagnetsStatus("success")

      toast({
        title: "Lead Magnet Added",
        description: `${newItem.title} has been added successfully.`,
      })

      return newItem
    } catch (error) {
      setLeadMagnetsStatus("error")
      handleApiError(error as Error, "adding lead magnet")
      throw error
    }
  }

  const updateLeadMagnet = async (id: number, item: Partial<LeadMagnet>): Promise<LeadMagnet> => {
    try {
      setLeadMagnetsStatus("loading")

      // Find lead magnet to update
      const itemIndex = leadMagnets.findIndex((l) => l.id === id)
      if (itemIndex === -1) {
        throw new Error(`Lead magnet with ID ${id} not found`)
      }

      // Create updated lead magnet
      const updatedItem = {
        ...leadMagnets[itemIndex],
        ...item,
      }

      // Simulate API call
      await simulateApiCall(updatedItem, 0.1)

      // Update state optimistically
      const newItems = [...leadMagnets]
      newItems[itemIndex] = updatedItem
      setLeadMagnets(newItems)
      setLeadMagnetsStatus("success")

      toast({
        title: "Lead Magnet Updated",
        description: `${updatedItem.title} has been updated successfully.`,
      })

      return updatedItem
    } catch (error) {
      setLeadMagnetsStatus("error")
      handleApiError(error as Error, "updating lead magnet")
      throw error
    }
  }

  const deleteLeadMagnet = async (id: number): Promise<boolean> => {
    try {
      setLeadMagnetsStatus("loading")

      // Find lead magnet to delete
      const itemIndex = leadMagnets.findIndex((l) => l.id === id)
      if (itemIndex === -1) {
        throw new Error(`Lead magnet with ID ${id} not found`)
      }

      const itemTitle = leadMagnets[itemIndex].title

      // Simulate API call
      await simulateApiCall(true, 0.1)

      // Update state optimistically
      setLeadMagnets((prev) => prev.filter((l) => l.id !== id))
      setLeadMagnetsStatus("success")

      toast({
        title: "Lead Magnet Deleted",
        description: `${itemTitle} has been deleted successfully.`,
      })

      return true
    } catch (error) {
      setLeadMagnetsStatus("error")
      handleApiError(error as Error, "deleting lead magnet")
      throw error
    }
  }

  // AI Services
  const connectAiService = (service: keyof typeof aiServicesConnected, connected: boolean) => {
    setAiServicesConnected((prev) => ({
      ...prev,
      [service]: connected,
    }))

    toast({
      title: connected ? "Service Connected" : "Service Disconnected",
      description: `${service.charAt(0).toUpperCase() + service.slice(1)} has been ${connected ? "connected" : "disconnected"} successfully.`,
    })
  }

  // Context value
  const value: ApiContextType = {
    // Products
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    productsStatus,

    // Content
    contentItems,
    addContentItem,
    updateContentItem,
    deleteContentItem,
    contentStatus,

    // Schedules
    scheduleItems,
    addScheduleItem,
    updateScheduleItem,
    deleteScheduleItem,
    scheduleStatus,

    // Lead Magnets
    leadMagnets,
    addLeadMagnet,
    updateLeadMagnet,
    deleteLeadMagnet,
    leadMagnetsStatus,

    // AI Services
    aiServicesConnected,
    connectAiService,
  }

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>
}

// Hook to use the API context
export function useApi() {
  const context = useContext(ApiContext)
  if (context === undefined) {
    throw new Error("useApi must be used within an ApiProvider")
  }
  return context
}

