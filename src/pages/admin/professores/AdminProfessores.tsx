"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { professorService } from "../../../services/professorService"
import type { ProfessorResponseDto } from "../../../types/professor"
import "./AdminProfessores.css"

const AdminProfessores: React.FC = () => {
  const [professores, setProfessores] = useState<ProfessorResponseDto[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")

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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredProfessores = professores.filter((professor) =>
    professor.nome.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="admin-professores">
      <h2>Lista de Professores</h2>
      <div className="admin-professores-actions">
        <div className="action-buttons">
          <Link to="/admin" className="btn-back">
            Voltar
          </Link>
          <Link to="/admin/professores/create" className="btn-create">
            Criar Novo Professor
          </Link>
        </div>
        <input
          type="text"
          placeholder="Pesquisar por nome..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Matrícula</th>
            <th>Email</th>
            <th>Nível</th>
            <th>Vínculo</th>
            <th>Data de Criação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredProfessores.map((professor) => (
            <tr key={professor.id}>
              <td>{professor.nome}</td>
              <td>{professor.matricula}</td>
              <td>{professor.email}</td>
              <td>{professor.nivel}</td>
              <td>{professor.vinculo}</td>
              <td>{new Date(professor.data_criacao).toLocaleDateString()}</td>
              <td>
                <Link to={`/admin/professores/view/${professor.id}`} className="btn-view">
                  Visualizar
                </Link>
                <Link to={`/admin/professores/edit/${professor.id}`} className="btn-edit">
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

export default AdminProfessores