import { useState } from "react"
import { Link } from "react-router-dom"
import "./Header.css"

function Header() {
  const [isOpen, setIsOpen] = useState({
    programas: false,
    ensino: false,
    documentos: false,
  })

  const toggleDropdown = (menu: keyof typeof isOpen) => {
    setIsOpen((prev) => ({ ...prev, [menu]: !prev[menu] }))
  }

  return (
    <header className="header">
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item dropdown">
            <button onClick={() => toggleDropdown("programas")} className="nav-link">
              Programas
            </button>
            {isOpen.programas && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/programas/apresentacao">Apresentação</Link>
                </li>
                <li>
                  <Link to="/programas/area-concentracao">Área de Concentração</Link>
                </li>
                <li>
                  <Link to="/programas/cursos">Cursos</Link>
                </li>
                <li>
                  <Link to="/programas/grade-curricular">Grade Curricular</Link>
                </li>
              </ul>
            )}
          </li>
          <li className="nav-item dropdown">
            <button onClick={() => toggleDropdown("ensino")} className="nav-link">
              Ensino
            </button>
            {isOpen.ensino && (
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
            )}
          </li>
          <li className="nav-item">
            <Link to="/calendario" className="nav-link">
              Calendário
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/processos-seletivos" className="nav-link">
              Processos Seletivos
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/noticia/list" className="nav-link">
              Notícias
            </Link>
          </li>
          <li className="nav-item dropdown">
            <button onClick={() => toggleDropdown("documentos")} className="nav-link">
              Documentos
            </button>
            {isOpen.documentos && (
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
            )}
          </li>
          <li className="nav-item">
            <Link to="/admin/list" className="nav-link">
              Administradores
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/aluno/list" className="nav-link">
              Alunos
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/professor/list" className="nav-link">
              Professores
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/curso/list" className="nav-link">
              Cursos
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/documento/list" className="nav-link">
              Documentos
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/grade-curricular/list" className="nav-link">
              Grade Curricular
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header