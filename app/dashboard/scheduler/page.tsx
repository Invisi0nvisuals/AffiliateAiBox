import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { SchedulerCalendar } from "@/components/scheduler-calendar"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default function SchedulerPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Content Scheduler" text="Schedule and manage your content posts">
        <Link href="/dashboard/scheduler/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Schedule
          </Button>
        </Link>
      </DashboardHeader>
      <SchedulerCalendar />
    </DashboardShell>
  )
}

