import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { LeadGenTable } from "@/components/lead-gen-table"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default function LeadsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Lead Generation" text="Manage your lead generation assets">
        <Link href="/dashboard/leads/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Lead Magnet
          </Button>
        </Link>
      </DashboardHeader>
      <LeadGenTable />
    </DashboardShell>
  )
}

