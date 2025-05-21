import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { LandingPagePreview } from "@/components/landing-page-preview"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function LandingPagePreviewPage({ params }: { params: { id: string } }) {
  return (
    <DashboardShell>
      <DashboardHeader heading="Landing Page Preview" text="Preview your lead generation landing page">
        <Link href="/dashboard/leads">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Lead Generation
          </Button>
        </Link>
      </DashboardHeader>
      <LandingPagePreview leadMagnetId={params.id} />
    </DashboardShell>
  )
}

