import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ApiConnectionsManager } from "@/components/api-connections-manager"

export default function ApiConnectionsPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="AI API Connections"
        text="Connect to AI services to enhance your content generation capabilities"
      />
      <div className="grid gap-8">
        <ApiConnectionsManager />
      </div>
    </DashboardShell>
  )
}

