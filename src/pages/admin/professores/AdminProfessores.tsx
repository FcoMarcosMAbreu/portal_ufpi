"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { professorService } from "../../../services/professorService"
import type { ProfessorResponseDto } from "../../../types/professor"
import "./AdminProfessores.css"
import ProfessorFormModal from "../../../components/professor/ProfessorFormModal"
import ProfessorViewModal from "../../../components/professor/ProfessorViewModal"

const AdminProfessores: React.FC = () => {
  const navigate = useNavigate()
  const [professores, setProfessores] = useState<ProfessorResponseDto[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedProfessor, setSelectedProfessor] = useState<ProfessorResponseDto | null>(null)

  useEffect(() => {
    fetchProfessores()
  }, [])

  // Função para buscar professores do banco de dados
  const fetchProfessores = async () => {
    try {
      const data = await professorService.getAll()
      setProfessores(data)
    } catch (error) {
      console.error("Erro ao buscar professores:", error)
    }
  }

  // Função para excluir um professor do banco de dados
  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este professor?")) {
      try {
        await professorService.delete(id)
        fetchProfessores() // Atualiza a lista após a exclusão
      } catch (error) {
        console.error("Erro ao excluir professor:", error)
      }
    }
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredProfessores = professores.filter(
    (professor) =>
      professor.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      professor.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const openCreateModal = () => setIsCreateModalOpen(true)
  const closeCreateModal = () => setIsCreateModalOpen(false)

  const openEditModal = (professor: ProfessorResponseDto) => {
    setSelectedProfessor(professor)
    setIsEditModalOpen(true)
  }
  const closeEditModal = () => {
    setSelectedProfessor(null)
    setIsEditModalOpen(false)
  }

  const openViewModal = (professor: ProfessorResponseDto) => {
    setSelectedProfessor(professor)
    setIsViewModalOpen(true)
  }
  const closeViewModal = () => {
    setSelectedProfessor(null)
    setIsViewModalOpen(false)
  }

  return (
    <div className="admin-professores">
      <h2>Lista de Professores</h2>
      <div className="admin-professores-actions">
        <div className="action-buttons">
          <button onClick={() => navigate("/admin")} className="btn-back">
            Voltar
          </button>
          <button onClick={openCreateModal} className="btn-create">
            Criar Novo Professor
          </button>
        </div>
        <input
          type="text"
          placeholder="Pesquisar por nome ou email..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Nível</th>
            <th>Vínculo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredProfessores.map((professor) => (
            <tr key={professor.id}>
              <td>{professor.nome}</td>
              <td>{professor.email}</td>
              <td>{professor.nivel}</td>
              <td>{professor.vinculo}</td>
              <td>
                <button onClick={() => openViewModal(professor)} className="btn-view">
                  Visualizar
                </button>
                <button onClick={() => openEditModal(professor)} className="btn-edit">
                  Editar
                </button>
                <button onClick={() => handleDelete(professor.id)} className="btn-delete">
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isCreateModalOpen && (
        <ProfessorFormModal isOpen={isCreateModalOpen} onClose={closeCreateModal} onSubmitSuccess={fetchProfessores} />
      )}
      {isEditModalOpen && selectedProfessor && (
        <ProfessorFormModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          onSubmitSuccess={fetchProfessores}
          professor={selectedProfessor}
        />
      )}
      {isViewModalOpen && selectedProfessor && (
        <ProfessorViewModal isOpen={isViewModalOpen} onClose={closeViewModal} professor={selectedProfessor} />
      )}
    </div>
  )
}

export default AdminProfessores

