"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FileText, Twitter, Facebook, Linkedin, Instagram, CalendarIcon } from "lucide-react"

// Sample scheduled posts data
const scheduledPosts = [
  {
    id: 1,
    title: "Why Kartra is the Best Marketing Tool in 2025",
    type: "blog_post",
    platform: "WordPress",
    date: new Date(2024, 3, 15),
    status: "published",
  },
  {
    id: 2,
    title: "10 Ways Kartra Can Automate Your Business",
    type: "blog_post",
    platform: "WordPress",
    date: new Date(2024, 3, 18),
    status: "scheduled",
  },
  {
    id: 3,
    title: "Just discovered how Kartra can 10x your marketing results!",
    type: "social_post",
    platform: "Twitter",
    date: new Date(2024, 3, 20),
    status: "scheduled",
  },
  {
    id: 4,
    title: "Transform your business with Kartra's automation features",
    type: "social_post",
    platform: "LinkedIn",
    date: new Date(2024, 3, 22),
    status: "scheduled",
  },
  {
    id: 5,
    title: "Check out this amazing all-in-one marketing platform!",
    type: "social_post",
    platform: "Facebook",
    date: new Date(2024, 3, 25),
    status: "scheduled",
  },
  {
    id: 6,
    title: "Kartra vs ClickFunnels: Which is Better?",
    type: "comparison",
    platform: "WordPress",
    date: new Date(2024, 3, 28),
    status: "scheduled",
  },
]

export function SchedulerCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedPost, setSelectedPost] = useState<any>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  // Get posts for the selected date
  const getPostsForDate = (date: Date | undefined) => {
    if (!date) return []

    return scheduledPosts.filter((post) => {
      return (
        post.date.getDate() === date.getDate() &&
        post.date.getMonth() === date.getMonth() &&
        post.date.getFullYear() === date.getFullYear()
      )
    })
  }

  // Get dates with posts for highlighting in calendar
  const datesWithPosts = scheduledPosts.map((post) => post.date)

  // Get icon based on platform
  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "twitter":
        return <Twitter className="h-4 w-4" />
      case "facebook":
        return <Facebook className="h-4 w-4" />
      case "linkedin":
        return <Linkedin className="h-4 w-4" />
      case "instagram":
        return <Instagram className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-[300px_1fr]">
      <Card>
        <CardHeader>
          <CardTitle>Calendar</CardTitle>
          <CardDescription>Select a date to view scheduled posts</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            modifiers={{
              booked: datesWithPosts,
            }}
            modifiersStyles={{
              booked: {
                fontWeight: "bold",
                backgroundColor: "rgba(34, 197, 94, 0.1)",
                color: "#16a34a",
              },
            }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Scheduled Posts</CardTitle>
          <CardDescription>
            {date
              ? `Posts scheduled for ${date.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}`
              : "Select a date to view scheduled posts"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {getPostsForDate(date).length > 0 ? (
            <div className="space-y-4">
              {getPostsForDate(date).map((post) => (
                <div key={post.id} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      {getPlatformIcon(post.platform)}
                    </div>
                    <div>
                      <p className="font-medium">{post.title}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{post.platform}</span>
                        <span>•</span>
                        <span>{post.type.replace("_", " ")}</span>
                        <span>•</span>
                        <Badge variant={post.status === "published" ? "default" : "secondary"}>{post.status}</Badge>
                      </div>
                    </div>
                  </div>
                  <Dialog
                    open={dialogOpen && selectedPost?.id === post.id}
                    onOpenChange={(open) => {
                      setDialogOpen(open)
                      if (!open) setSelectedPost(null)
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedPost(post)
                          setDialogOpen(true)
                        }}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Post Details</DialogTitle>
                        <DialogDescription>View and manage this scheduled post</DialogDescription>
                      </DialogHeader>
                      {selectedPost && (
                        <div className="space-y-4 pt-4">
                          <div className="space-y-2">
                            <h3 className="font-semibold">Title</h3>
                            <p>{selectedPost.title}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <h3 className="font-semibold">Platform</h3>
                              <div className="flex items-center gap-2">
                                {getPlatformIcon(selectedPost.platform)}
                                <span>{selectedPost.platform}</span>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <h3 className="font-semibold">Type</h3>
                              <p>{selectedPost.type.replace("_", " ")}</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <h3 className="font-semibold">Date</h3>
                              <p>{selectedPost.date.toLocaleDateString()}</p>
                            </div>
                            <div className="space-y-2">
                              <h3 className="font-semibold">Status</h3>
                              <Badge variant={selectedPost.status === "published" ? "default" : "secondary"}>
                                {selectedPost.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex justify-end gap-2 pt-4">
                            <Button variant="outline">Edit</Button>
                            <Button variant="destructive">Cancel Post</Button>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed">
              <div className="text-center">
                <CalendarIcon className="mx-auto h-10 w-10 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">No posts scheduled for this date</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

