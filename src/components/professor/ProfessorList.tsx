import type React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { professorService } from "../../services/professorService"
import type { ProfessorResponseDto } from "../../types/professor"
import "./ProfessorList.css"

const ProfessorList: React.FC = () => {
  const [professores, setProfessores] = useState<ProfessorResponseDto[]>([])

  useEffect(() => {
    fetchProfessores()
  }, [])

  const fetchProfessores = async () => {
    try {
      const data = await professorService.getAll()
      setProfessores(data)
    } catch (error) {
      console.error("Erro ao buscar professores:", error)
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este professor?")) {
      try {
        await professorService.delete(id)
        fetchProfessores()
      } catch (error) {
        console.error("Erro ao excluir professor:", error)
      }
    }
  }

  return (
    <div className="professor-list">
      <h2>Lista de Professores</h2>
      <Link to="/professor/create" className="btn-create">
        Criar Novo Professor
      </Link>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Matrícula</th>
            <th>Email</th>
            <th>Nível</th>
            <th>Vínculo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {professores.map((professor) => (
            <tr key={professor.id}>
              <td>{professor.nome}</td>
              <td>{professor.matricula}</td>
              <td>{professor.email}</td>
              <td>{professor.nivel}</td>
              <td>{professor.vinculo}</td>
              <td>
                <Link to={`/professor/edit/${professor.id}`} className="btn-edit">
                  Editar
                </Link>
                <button onClick={() => handleDelete(professor.id)} className="btn-delete">
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProfessorList