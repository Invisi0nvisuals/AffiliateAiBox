import type React from "react"
import { useApi } from "@/lib/api-context"
import { Badge } from "@/components/ui/badge"

interface DashboardHeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
  showAiBadges?: boolean
}

export function DashboardHeader({ heading, text, children, showAiBadges = false }: DashboardHeaderProps) {
  const { aiServicesConnected } = useApi()

  return (
    <div className="flex flex-col gap-4 px-2 py-4 md:flex-row md:items-center md:justify-between">
      <div className="grid gap-1">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight">{heading}</h1>
          {showAiBadges && (
            <div className="flex gap-1">
              {aiServicesConnected.openai && (
                <Badge variant="outline" className="bg-primary/10">
                  OpenAI
                </Badge>
              )}
              {aiServicesConnected.midjourney && (
                <Badge variant="outline" className="bg-primary/10">
                  Midjourney
                </Badge>
              )}
              {aiServicesConnected.elevenLabs && (
                <Badge variant="outline" className="bg-primary/10">
                  Eleven Labs
                </Badge>
              )}
              {aiServicesConnected.fluxApi && (
                <Badge variant="outline" className="bg-primary/10">
                  Flux API
                </Badge>
              )}
            </div>
          )}
        </div>
        {text && <p className="text-muted-foreground">{text}</p>}
      </div>
      {children}
    </div>
  )
}

