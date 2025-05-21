import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ContentTable } from "@/components/content-table"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default function ContentPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Content" text="Manage your generated content">
        <Link href="/dashboard/content/generate">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Generate Content
          </Button>
        </Link>
      </DashboardHeader>
      <ContentTable />
    </DashboardShell>
  )
}

