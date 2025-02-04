import type React from "react"

interface ResourceGridProps {
  children: React.ReactNode
}

export function ResourceGrid({ children }: ResourceGridProps) {
  return <div className="resource-grid">{children}</div>
}