import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { FileText, Package, Calendar, Users, BarChart3 } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "product",
    title: "Added new product",
    description: "Kartra was added to your products",
    time: "2 hours ago",
    icon: Package,
  },
  {
    id: 2,
    type: "content",
    title: "Generated content",
    description: "5 new content pieces created",
    time: "5 hours ago",
    icon: FileText,
  },
  {
    id: 3,
    type: "schedule",
    title: "Created posting schedule",
    description: "14 posts scheduled for next week",
    time: "Yesterday",
    icon: Calendar,
  },
  {
    id: 4,
    type: "lead",
    title: "New lead captured",
    description: "Someone downloaded your lead magnet",
    time: "Yesterday",
    icon: Users,
  },
  {
    id: 5,
    type: "analytics",
    title: "Analytics report",
    description: "Monthly report generated",
    time: "2 days ago",
    icon: BarChart3,
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-8">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary/10">
              <activity.icon className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{activity.title}</p>
            <p className="text-sm text-muted-foreground">{activity.description}</p>
            <p className="text-xs text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

