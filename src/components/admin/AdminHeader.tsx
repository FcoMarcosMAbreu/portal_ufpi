import type React from "react"
import { Link, useNavigate } from "react-router-dom"
import { authService } from "../../services/authService"
import logo from "../../assets/images/logo.png"
import "./AdminHeader.css"

const AdminHeader: React.FC = () => {
  const navigate = useNavigate()
  const currentUser = authService.getCurrentUser()

  const handleLogout = () => {
    authService.logout()
    navigate("/admin/login")
  }

  return (
    <header className="admin-header">
      <div className="admin-header-content">
        <Link to="/admin" className="admin-logo-link">
          <img src={logo} alt="Logo" className="admin-logo" />
        </Link>
        <div className="admin-user-info">
          {currentUser && <span className="admin-user-name">Olá, {currentUser.email}</span>}
          <button onClick={handleLogout} className="admin-logout-button">
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader