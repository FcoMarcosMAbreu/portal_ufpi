"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { turmaService } from "../../../services/turmaService"
import type { TurmaDto } from "../../../types/turma"
import "./AdminTurmas.css"

const AdminTurmas: React.FC = () => {
  const [turmas, setTurmas] = useState<TurmaDto[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")

  useEffect(() => {
    fetchTurmas()
  }, [])

  const fetchTurmas = async () => {
    try {
      const data = await turmaService.getAll()
      setTurmas(data)
    } catch (error) {
      console.error("Erro ao buscar turmas:", error)
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta turma?")) {
      try {
        await turmaService.delete(id)
        fetchTurmas()
      } catch (error) {
        console.error("Erro ao excluir turma:", error)
      }
    }
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredTurmas = turmas.filter((turma) => turma.nome_turma.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="admin-turmas">
      <h2>Lista de Turmas</h2>
      <div className="admin-turmas-actions">
        <div className="action-buttons">
          <Link to="/admin" className="btn-back">
            Voltar
          </Link>
          <Link to="/admin/turmas/create" className="btn-create">
            Criar Nova Turma
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
            <th>Matéria</th>
            <th>Nome da Turma</th>
            <th>Horários</th>
            <th>Período/Ano</th>
            <th>Docentes</th>
            <th>Data de Criação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredTurmas.map((turma) => (
            <tr key={turma.id}>
              <td>{turma.materia}</td>
              <td>{turma.nome_turma}</td>
              <td>{turma.horarios}</td>
              <td>{turma.periodo_ano}</td>
              <td>{turma.docentes}</td>
              <td>{new Date(turma.data_criacao).toLocaleDateString()}</td>
              <td>
                <Link to={`/admin/turmas/view/${turma.id}`} className="btn-view">
                  Visualizar
                </Link>
                <Link to={`/admin/turmas/edit/${turma.id}`} className="btn-edit">
                  Editar
                </Link>
                <button onClick={() => handleDelete(turma.id)} className="btn-delete">
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

export default AdminTurmas

