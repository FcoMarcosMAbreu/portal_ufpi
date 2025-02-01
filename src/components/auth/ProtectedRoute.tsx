import type React from "react"
import { useEffect, useState } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { authService } from "../../services/authService"

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const location = useLocation()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await authService.getCurrentUser()
        setIsAuthenticated(true)
      } catch (error) {
        setIsAuthenticated(false)
      }
    }

    checkAuth()
  }, [])

  if (isAuthenticated === null) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}

export default ProtectedRoute