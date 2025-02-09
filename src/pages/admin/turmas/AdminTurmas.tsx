"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { turmaService } from "../../../services/turmaService"
import type { TurmaDto } from "../../../types/turma"
import "./AdminTurmas.css"
import TurmaFormModal from "../../../components/turma/TurmaFormModal"
import TurmaViewModal from "../../../components/turma/TurmaViewModal"

const AdminTurmas: React.FC = () => {
  const navigate = useNavigate()
  const [turmas, setTurmas] = useState<TurmaDto[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedTurma, setSelectedTurma] = useState<TurmaDto | null>(null)

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

  const filteredTurmas = turmas.filter(
    (turma) =>
      turma.materia.toLowerCase().includes(searchTerm.toLowerCase()) ||
      turma.nome_turma.toLowerCase().includes(searchTerm.toLowerCase()) ||
      turma.docentes.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const openCreateModal = () => setIsCreateModalOpen(true)
  const closeCreateModal = () => setIsCreateModalOpen(false)

  const openEditModal = (turma: TurmaDto) => {
    setSelectedTurma(turma)
    setIsEditModalOpen(true)
  }
  const closeEditModal = () => {
    setSelectedTurma(null)
    setIsEditModalOpen(false)
  }

  const openViewModal = (turma: TurmaDto) => {
    setSelectedTurma(turma)
    setIsViewModalOpen(true)
  }
  const closeViewModal = () => {
    setSelectedTurma(null)
    setIsViewModalOpen(false)
  }

  return (
    <div className="admin-turmas">
      <h2>Lista de Turmas</h2>
      <div className="admin-turmas-actions">
        <div className="action-buttons">
          <button onClick={() => navigate("/admin")} className="btn-back">
            Voltar
          </button>
          <button onClick={openCreateModal} className="btn-create">
            Criar Nova Turma
          </button>
        </div>
        <input
          type="text"
          placeholder="Pesquisar por matéria, nome da turma ou docentes..."
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
              <td>
                <button onClick={() => openViewModal(turma)} className="btn-view">
                  Visualizar
                </button>
                <button onClick={() => openEditModal(turma)} className="btn-edit">
                  Editar
                </button>
                <button onClick={() => handleDelete(turma.id)} className="btn-delete">
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isCreateModalOpen && (
        <TurmaFormModal isOpen={isCreateModalOpen} onClose={closeCreateModal} onSubmitSuccess={fetchTurmas} />
      )}
      {isEditModalOpen && selectedTurma && (
        <TurmaFormModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          onSubmitSuccess={fetchTurmas}
          turma={selectedTurma}
        />
      )}
      {isViewModalOpen && selectedTurma && (
        <TurmaViewModal isOpen={isViewModalOpen} onClose={closeViewModal} turma={selectedTurma} />
      )}
    </div>
  )
}

export default AdminTurmas