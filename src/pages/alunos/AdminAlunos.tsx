"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { alunoService } from "../../services/alunoService"
import type { AlunoResponseDto } from "../../types/aluno"
import "./AdminAlunos.css"
import AlunoFormModal from "./AlunoFormModal"
import AlunoViewModal from "./AlunoViewModal"

const AdminAluno: React.FC = () => {
  const navigate = useNavigate()
  const [alunos, setAlunos] = useState<AlunoResponseDto[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedAluno, setSelectedAluno] = useState<AlunoResponseDto | null>(null)

  useEffect(() => {
    fetchAlunos()
  }, [])

  const fetchAlunos = async () => {
    try {
      const data = await alunoService.getAll()
      setAlunos(data)
    } catch (error) {
      console.error("Erro ao buscar alunos:", error)
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este aluno?")) {
      try {
        await alunoService.delete(id)
        fetchAlunos()
      } catch (error) {
        console.error("Erro ao excluir aluno:", error)
      }
    }
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredAlunos = alunos.filter(
    (aluno) =>
      aluno.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      aluno.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      aluno.matricula.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const openCreateModal = () => setIsCreateModalOpen(true)
  const closeCreateModal = () => setIsCreateModalOpen(false)

  const openEditModal = (aluno: AlunoResponseDto) => {
    setSelectedAluno(aluno)
    setIsEditModalOpen(true)
  }
  const closeEditModal = () => {
    setSelectedAluno(null)
    setIsEditModalOpen(false)
  }

  const openViewModal = (aluno: AlunoResponseDto) => {
    setSelectedAluno(aluno)
    setIsViewModalOpen(true)
  }
  const closeViewModal = () => {
    setSelectedAluno(null)
    setIsViewModalOpen(false)
  }

  return (
    <div className="admin-alunos">
      <h2>Lista de Alunos</h2>
      <div className="admin-alunos-actions">
        <div className="action-buttons">
          <button onClick={() => navigate("/admin")} className="btn-back">
            Voltar
          </button>
          <button onClick={openCreateModal} className="btn-create">
            Criar Novo Aluno
          </button>
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
            <th>Email</th>
            <th>Matrícula</th>
            <th>Curso</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredAlunos.map((aluno) => (
            <tr key={aluno.id}>
              <td>{aluno.nome}</td>
              <td>{aluno.email}</td>
              <td>{aluno.matricula}</td>
              <td>{aluno.curso}</td>
              <td>
                <button onClick={() => openViewModal(aluno)} className="btn-view">
                  Visualizar
                </button>
                <button onClick={() => openEditModal(aluno)} className="btn-edit">
                  Editar
                </button>
                <button onClick={() => handleDelete(aluno.id)} className="btn-delete">
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isCreateModalOpen && (
        <AlunoFormModal isOpen={isCreateModalOpen} onClose={closeCreateModal} onSubmitSuccess={fetchAlunos} />
      )}
      {isEditModalOpen && selectedAluno && (
        <AlunoFormModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          onSubmitSuccess={fetchAlunos}
          aluno={selectedAluno}
        />
      )}
      {isViewModalOpen && selectedAluno && (
        <AlunoViewModal isOpen={isViewModalOpen} onClose={closeViewModal} aluno={selectedAluno} />
      )}
    </div>
  )
}

export default AdminAluno