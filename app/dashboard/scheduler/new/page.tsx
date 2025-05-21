import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ScheduleCreationForm } from "@/components/schedule-creation-form"

export default function NewSchedulePage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Create Posting Schedule" text="Schedule your content for publication" />
      <div className="grid gap-8">
        <ScheduleCreationForm />
      </div>
    </DashboardShell>
  )
}

