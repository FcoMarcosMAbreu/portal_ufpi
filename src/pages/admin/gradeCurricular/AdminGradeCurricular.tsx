"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { gradeCurricularService } from "../../../services/gradeCurricularService"
import type { GradeCurricularDto } from "../../../types/gradeCurricular"
import "./AdminGradeCurricular.css"

const AdminGradeCurricular: React.FC = () => {
  const [gradesCurriculares, setGradesCurriculares] = useState<GradeCurricularDto[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")

  useEffect(() => {
    fetchGradesCurriculares()
  }, [])

  const fetchGradesCurriculares = async () => {
    try {
      const data = await gradeCurricularService.getAll()
      setGradesCurriculares(data)
    } catch (error) {
      console.error("Erro ao buscar grades curriculares:", error)
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta grade curricular?")) {
      try {
        await gradeCurricularService.delete(id)
        fetchGradesCurriculares()
      } catch (error) {
        console.error("Erro ao excluir grade curricular:", error)
      }
    }
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredGradesCurriculares = gradesCurriculares.filter((grade) =>
    grade.titulo.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="admin-grade-curricular">
      <h2>Lista de Grades Curriculares</h2>
      <div className="admin-grade-curricular-actions">
        <Link to="/admin/grade-curricular/create" className="btn-create">
          Criar Nova Grade Curricular
        </Link>
        <input
          type="text"
          placeholder="Pesquisar por título..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
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
          {filteredGradesCurriculares.map((grade) => (
            <tr key={grade.id}>
              <td>{grade.titulo}</td>
              <td>{grade.codigo}</td>
              <td>{grade.componente_curricular}</td>
              <td>{grade.carga_horaria}</td>
              <td>{new Date(grade.data_criacao).toLocaleDateString()}</td>
              <td>
                <Link to={`/admin/grade-curricular/view/${grade.id}`} className="btn-view">
                  Visualizar
                </Link>
                <Link to={`/admin/grade-curricular/edit/${grade.id}`} className="btn-edit">
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

export default AdminGradeCurricular