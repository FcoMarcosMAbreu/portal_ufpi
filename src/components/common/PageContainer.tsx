import type React from "react"

interface PageContainerProps {
  children: React.ReactNode
  title?: string
  description?: string
}

export function PageContainer({ children, title, description }: PageContainerProps) {
  return (
    <div className="list-container">
      {(title || description) && (
        <div className="section-header">
          {title && <h2>{title}</h2>}
          {description && <p>{description}</p>}
        </div>
      )}
      {children}
    </div>
  )
}