import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ContentPreview } from "@/components/content-preview"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ContentDetailPage({ params }: { params: { id: string } }) {
  return (
    <DashboardShell>
      <DashboardHeader heading="Content Preview" text="View and edit your generated content">
        <Link href="/dashboard/content">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Content
          </Button>
        </Link>
      </DashboardHeader>
      <ContentPreview contentId={params.id} />
    </DashboardShell>
  )
}

