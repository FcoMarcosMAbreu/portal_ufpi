"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { calendarioService } from "../../../services/calendarioService"
import type { CalendarioDto } from "../../../types/calendario"
import "./AdminCalendario.css"

const AdminCalendario: React.FC = () => {
  const [calendarios, setCalendarios] = useState<CalendarioDto[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")

  useEffect(() => {
    fetchCalendarios()
  }, [])

  const fetchCalendarios = async () => {
    try {
      const data = await calendarioService.getAll()
      setCalendarios(data)
    } catch (error) {
      console.error("Erro ao buscar eventos do calendário:", error)
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este evento do calendário?")) {
      try {
        await calendarioService.delete(id)
        fetchCalendarios()
      } catch (error) {
        console.error("Erro ao excluir evento do calendário:", error)
      }
    }
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredCalendarios = calendarios.filter((item) => item.titulo.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="admin-calendario">
      <h2>Lista de Eventos do Calendário</h2>
      <div className="admin-calendario-actions">
        <div className="action-buttons">
          <Link to="/admin" className="btn-back">
            Voltar
          </Link>
          <Link to="/admin/calendario/create" className="btn-create">
            Criar Novo Evento
          </Link>
        </div>
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
            <th>Descrição</th>
            <th>Data de Início</th>
            <th>Data de Término</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredCalendarios.map((item) => (
            <tr key={item.id}>
              <td>{item.titulo}</td>
              <td>{item.descricao}</td>
              <td>{item.data_inicio}</td>
              <td>{item.data_termino}</td>
              <td>
                <Link to={`/admin/calendario/view/${item.id}`} className="btn-view">
                  Visualizar
                </Link>
                <Link to={`/admin/calendario/edit/${item.id}`} className="btn-edit">
                  Editar
                </Link>
                <button onClick={() => handleDelete(item.id)} className="btn-delete">
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

export default AdminCalendario