"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { calendarioService } from "../../../services/calendarioService"
import type { CalendarioDto } from "../../../types/calendario"
import "./AdminCalendario.css"
import CalendarioFormModal from "../../../components/calendario/CalendarioFormModal"
import CalendarioViewModal from "../../../components/calendario/CalendarioViewModal"

const AdminCalendario: React.FC = () => {
  const navigate = useNavigate()
  const [calendarios, setCalendarios] = useState<CalendarioDto[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedCalendario, setSelectedCalendario] = useState<CalendarioDto | null>(null)

  useEffect(() => {
    fetchCalendarios()
  }, [])

  // Função para buscar eventos do calendário do banco de dados
  const fetchCalendarios = async () => {
    try {
      const data = await calendarioService.getAll()
      setCalendarios(data)
    } catch (error) {
      console.error("Erro ao buscar eventos do calendário:", error)
    }
  }

  // Função para excluir um evento do calendário do banco de dados
  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este evento do calendário?")) {
      try {
        await calendarioService.delete(id)
        fetchCalendarios() // Atualiza a lista após a exclusão
      } catch (error) {
        console.error("Erro ao excluir evento do calendário:", error)
      }
    }
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredCalendarios = calendarios.filter(
    (item) =>
      item.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.descricao.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const openCreateModal = () => setIsCreateModalOpen(true)
  const closeCreateModal = () => setIsCreateModalOpen(false)

  const openEditModal = (calendario: CalendarioDto) => {
    setSelectedCalendario(calendario)
    setIsEditModalOpen(true)
  }
  const closeEditModal = () => {
    setSelectedCalendario(null)
    setIsEditModalOpen(false)
  }

  const openViewModal = (calendario: CalendarioDto) => {
    setSelectedCalendario(calendario)
    setIsViewModalOpen(true)
  }
  const closeViewModal = () => {
    setSelectedCalendario(null)
    setIsViewModalOpen(false)
  }

  return (
    <div className="admin-calendario">
      <h2>Lista de Eventos do Calendário</h2>
      <div className="admin-calendario-actions">
        <div className="action-buttons">
          <button onClick={() => navigate("/admin")} className="btn-back">
            Voltar
          </button>
          <button onClick={openCreateModal} className="btn-create">
            Criar Novo Evento
          </button>
        </div>
        <input
          type="text"
          placeholder="Pesquisar por título ou descrição..."
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
              <td>{new Date(item.data_inicio).toLocaleDateString()}</td>
              <td>{new Date(item.data_termino).toLocaleDateString()}</td>
              <td>
                <button onClick={() => openViewModal(item)} className="btn-view">
                  Visualizar
                </button>
                <button onClick={() => openEditModal(item)} className="btn-edit">
                  Editar
                </button>
                <button onClick={() => handleDelete(item.id)} className="btn-delete">
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isCreateModalOpen && (
        <CalendarioFormModal isOpen={isCreateModalOpen} onClose={closeCreateModal} onSubmitSuccess={fetchCalendarios} />
      )}
      {isEditModalOpen && selectedCalendario && (
        <CalendarioFormModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          onSubmitSuccess={fetchCalendarios}
          calendario={selectedCalendario}
        />
      )}
      {isViewModalOpen && selectedCalendario && (
        <CalendarioViewModal isOpen={isViewModalOpen} onClose={closeViewModal} calendario={selectedCalendario} />
      )}
    </div>
  )
}

export default AdminCalendario