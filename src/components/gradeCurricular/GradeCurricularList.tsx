import type React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { gradeCurricularService } from "../../services/gradeCurricularService"
import type { GradeCurricularDto } from "../../types/gradeCurricular"
import "./GradeCurricularList.css"

const GradeCurricularList: React.FC = () => {
  const [gradeCurriculares, setGradeCurriculares] = useState<GradeCurricularDto[]>([])

  useEffect(() => {
    fetchGradeCurriculares()
  }, [])

  const fetchGradeCurriculares = async () => {
    try {
      const data = await gradeCurricularService.getAll()
      setGradeCurriculares(data)
    } catch (error) {
      console.error("Erro ao buscar grades curriculares:", error)
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta grade curricular?")) {
      try {
        await gradeCurricularService.delete(id)
        fetchGradeCurriculares()
      } catch (error) {
        console.error("Erro ao excluir grade curricular:", error)
      }
    }
  }

  return (
    <div className="grade-curricular-list">
      <h2>Lista de Grades Curriculares</h2>
      <Link to="/grade-curricular/create" className="btn-create">
        Criar Nova Grade Curricular
      </Link>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Código</th>
            <th>Componente Curricular</th>
            <th>Carga Horária</th>
            <th>Data de Criação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {gradeCurriculares.map((grade) => (
            <tr key={grade.id}>
              <td>{grade.titulo}</td>
              <td>{grade.codigo}</td>
              <td>{grade.componente_curricular}</td>
              <td>{grade.carga_horaria}</td>
              <td>{new Date(grade.data_criacao).toLocaleDateString()}</td>
              <td>
                <Link to={`/grade-curricular/edit/${grade.id}`} className="btn-edit">
                  Editar
                </Link>
                <button onClick={() => handleDelete(grade.id)} className="btn-delete">
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

export default GradeCurricularList