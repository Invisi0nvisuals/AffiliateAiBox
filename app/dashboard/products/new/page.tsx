import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { NewProductForm } from "@/components/new-product-form"

export default function NewProductPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Add New Product" text="Add a new affiliate product to research and promote" />
      <div className="grid gap-8">
        <NewProductForm />
      </div>
    </DashboardShell>
  )
}

