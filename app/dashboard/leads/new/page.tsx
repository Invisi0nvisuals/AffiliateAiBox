import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { LeadMagnetForm } from "@/components/lead-magnet-form"

export default function NewLeadMagnetPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Create Lead Magnet" text="Create a new lead magnet to capture leads" />
      <div className="grid gap-8">
        <LeadMagnetForm />
      </div>
    </DashboardShell>
  )
}

