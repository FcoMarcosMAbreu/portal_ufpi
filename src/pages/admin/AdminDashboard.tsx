import type React from "react"
import { Link } from "react-router-dom"
import "./AdminDashboard.css"

const resources = [
  { name: "Administradores", path: "/admin/administradores" },
  { name: "Alunos", path: "/admin/alunos" },
  { name: "Notícias", path: "/admin/noticias" },
  { name: "Professores", path: "/admin/professores" },
  { name: "Cursos", path: "/admin/cursos"  },
  { name: "Documentos", path: "/admin/documentos" },
  { name: "Grade Curricular", path: "/admin/grade-curricular" },
  { name: "Turmas", path: "/admin/turmas" },
  { name: "Dissertações e Teses", path: "/admin/dissertacoes-teses" },
  { name: "Calendário", path: "/admin/calendario" },
  { name: "Processos Seletivos", path: "/admin/processos-seletivos" },
]

const AdminDashboard: React.FC = () => {
  return (
    <div className="admin-dashboard">
      <h1>Painel Administrativo</h1>
      <div className="admin-resource-grid">
        {resources.map((resource) => (
          <Link to={resource.path} key={resource.path} className="admin-resource-card">
            <h2>{resource.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default AdminDashboard

