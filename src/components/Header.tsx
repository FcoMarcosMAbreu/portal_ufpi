import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { authService } from "../services/authService"
import logo from "../assets/images/logo.png"
import "./Header.css"

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        await authService.getCurrentUser()
        setIsLoggedIn(true)
      } catch (error) {
        setIsLoggedIn(false)
      }
    }
    checkLoginStatus()
  }, [])

  const handleLogout = () => {
    authService.removeToken()
    setIsLoggedIn(false)
    navigate("/login")
  }

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo-link">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        <nav className="navbar">
          <ul className="nav-list">
            <li className="nav-item">
              <span className="nav-link">Programas</span>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/">Apresentação</Link>
                </li>
                <li>
                  <Link to="/programas/grade-curricular">Grade Curricular</Link>
                </li>
                <li>
                  <Link to="/programas/area-concentracao">Área de Concentração</Link>
                </li>
                <li>
                  <Link to="/programas/cursos">Cursos</Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <span className="nav-link">Ensino</span>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/ensino/alunos-ativos">Alunos Ativos</Link>
                </li>
                <li>
                  <Link to="/ensino/corpo-docente">Corpo Docente</Link>
                </li>
                <li>
                  <Link to="/ensino/cursos">Cursos</Link>
                </li>
                <li>
                  <Link to="/ensino/teses-dissertacoes">Teses/Dissertações</Link>
                </li>
                <li>
                  <Link to="/ensino/turmas">Turmas</Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to="/calendario" className="nav-link">
                Calendário
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/processo-seletivo" className="nav-link">
                Processos Seletivos
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/noticia" className="nav-link">
                Notícias
              </Link>
            </li>
            <li className="nav-item">
              <span className="nav-link">Documentos</span>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/documentos/formularios">Formulários</Link>
                </li>
                <li>
                  <Link to="/documentos/resolucao">Resolução</Link>
                </li>
                <li>
                  <Link to="/documentos/regimento">Regimento</Link>
                </li>
                <li>
                  <Link to="/documentos/outros">Outros</Link>
                </li>
                <li>
                  <Link to="/documentos/material-didatico">Material Didático</Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        <div className="auth-links">
          {isLoggedIn ? (
            <>
              <Link to="/admin" className="nav-link">
                Admin Dashboard
              </Link>
              <button onClick={handleLogout} className="nav-link">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="nav-link">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header