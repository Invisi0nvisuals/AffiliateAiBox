import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ContentGenerationForm } from "@/components/content-generation-form"

export default function GenerateContentPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Generate Content"
        text="Create new content for your affiliate products"
        showAiBadges={true}
      />
      <div className="grid gap-8">
        <ContentGenerationForm />
      </div>
    </DashboardShell>
  )
}

