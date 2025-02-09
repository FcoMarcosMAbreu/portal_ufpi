"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { cursoService } from "../../../services/cursoService"
import type { CursoResponseDto } from "../../../types/curso"
import "./AdminCursos.css"
import CursoFormModal from "../../../components/curso/CursoFormModal"
import CursoViewModal from "../../../components/curso/CursoViewModal"

const AdminCursos: React.FC = () => {
  const navigate = useNavigate()
  const [cursos, setCursos] = useState<CursoResponseDto[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedCurso, setSelectedCurso] = useState<CursoResponseDto | null>(null)

  useEffect(() => {
    fetchCursos()
  }, [])

  // Função para buscar cursos do banco de dados
  const fetchCursos = async () => {
    try {
      const data = await cursoService.getAll()
      setCursos(data)
    } catch (error) {
      console.error("Erro ao buscar cursos:", error)
    }
  }

  // Função para excluir um curso do banco de dados
  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este curso?")) {
      try {
        await cursoService.delete(id)
        fetchCursos() // Atualiza a lista após a exclusão
      } catch (error) {
        console.error("Erro ao excluir curso:", error)
      }
    }
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredCursos = cursos.filter((curso) => curso.nome.toLowerCase().includes(searchTerm.toLowerCase()))

  const openCreateModal = () => setIsCreateModalOpen(true)
  const closeCreateModal = () => setIsCreateModalOpen(false)

  const openEditModal = (curso: CursoResponseDto) => {
    setSelectedCurso(curso)
    setIsEditModalOpen(true)
  }
  const closeEditModal = () => {
    setSelectedCurso(null)
    setIsEditModalOpen(false)
  }

  const openViewModal = (curso: CursoResponseDto) => {
    setSelectedCurso(curso)
    setIsViewModalOpen(true)
  }
  const closeViewModal = () => {
    setSelectedCurso(null)
    setIsViewModalOpen(false)
  }

  return (
    <div className="admin-cursos">
      <h2>Lista de Cursos</h2>
      <div className="admin-cursos-actions">
        <div className="action-buttons">
          <button onClick={() => navigate("/admin")} className="btn-back">
            Voltar
          </button>
          <button onClick={openCreateModal} className="btn-create">
            Criar Novo Curso
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
            <th>Link Documento CAPES</th>
            <th>Link Detalhes do Curso</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredCursos.map((curso) => (
            <tr key={curso.id}>
              <td>{curso.nome}</td>
              <td>
                <a href={curso.link_documento_capes} target="_blank" rel="noopener noreferrer">
                  Documento CAPES
                </a>
              </td>
              <td>
                <a href={curso.link_detalhes_curso} target="_blank" rel="noopener noreferrer">
                  Detalhes do Curso
                </a>
              </td>
              <td>
                <button onClick={() => openViewModal(curso)} className="btn-view">
                  Visualizar
                </button>
                <button onClick={() => openEditModal(curso)} className="btn-edit">
                  Editar
                </button>
                <button onClick={() => handleDelete(curso.id)} className="btn-delete">
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isCreateModalOpen && (
        <CursoFormModal isOpen={isCreateModalOpen} onClose={closeCreateModal} onSubmitSuccess={fetchCursos} />
      )}
      {isEditModalOpen && selectedCurso && (
        <CursoFormModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          onSubmitSuccess={fetchCursos}
          curso={selectedCurso}
        />
      )}
      {isViewModalOpen && selectedCurso && (
        <CursoViewModal isOpen={isViewModalOpen} onClose={closeViewModal} curso={selectedCurso} />
      )}
    </div>
  )
}

export default AdminCursos