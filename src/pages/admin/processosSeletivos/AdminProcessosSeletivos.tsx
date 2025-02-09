"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { processoSeletivoService } from "../../../services/processoSeletivoService"
import type { ProcessoSeletivoDto } from "../../../types/processoSeletivo"
import "./AdminProcessosSeletivos.css"
import ProcessoSeletivoFormModal from "../../../components/processoSeletivo/ProcessoSeletivoFormModal"
import ProcessoSeletivoViewModal from "../../../components/processoSeletivo/ProcessoSeletivoViewModal"

const AdminProcessosSeletivos: React.FC = () => {
  const navigate = useNavigate()
  const [processosSeletivos, setProcessosSeletivos] = useState<ProcessoSeletivoDto[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedProcessoSeletivo, setSelectedProcessoSeletivo] = useState<ProcessoSeletivoDto | null>(null)

  useEffect(() => {
    fetchProcessosSeletivos()
  }, [])

  const fetchProcessosSeletivos = async () => {
    try {
      const data = await processoSeletivoService.getAll()
      setProcessosSeletivos(data)
    } catch (error) {
      console.error("Erro ao buscar processos seletivos:", error)
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este processo seletivo?")) {
      try {
        await processoSeletivoService.delete(id)
        fetchProcessosSeletivos()
      } catch (error) {
        console.error("Erro ao excluir processo seletivo:", error)
      }
    }
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredProcessosSeletivos = processosSeletivos.filter(
    (item) =>
      item.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.descricao.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const openCreateModal = () => setIsCreateModalOpen(true)
  const closeCreateModal = () => setIsCreateModalOpen(false)

  const openEditModal = (processoSeletivo: ProcessoSeletivoDto) => {
    setSelectedProcessoSeletivo(processoSeletivo)
    setIsEditModalOpen(true)
  }
  const closeEditModal = () => {
    setSelectedProcessoSeletivo(null)
    setIsEditModalOpen(false)
  }

  const openViewModal = (processoSeletivo: ProcessoSeletivoDto) => {
    setSelectedProcessoSeletivo(processoSeletivo)
    setIsViewModalOpen(true)
  }
  const closeViewModal = () => {
    setSelectedProcessoSeletivo(null)
    setIsViewModalOpen(false)
  }

  return (
    <div className="admin-processos-seletivos">
      <h2>Lista de Processos Seletivos</h2>
      <div className="admin-processos-seletivos-actions">
        <div className="action-buttons">
          <button onClick={() => navigate("/admin")} className="btn-back">
            Voltar
          </button>
          <button onClick={openCreateModal} className="btn-create">
            Criar Novo Processo Seletivo
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
            <th>Link de Inscrição</th>
            <th>Data de Criação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredProcessosSeletivos.map((item) => (
            <tr key={item.id}>
              <td>{item.titulo}</td>
              <td>{item.descricao}</td>
              <td>
                <a href={item.link_inscricao} target="_blank" rel="noopener noreferrer">
                  Link de Inscrição
                </a>
              </td>
              <td>{new Date(item.data_criacao).toLocaleDateString()}</td>
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
        <ProcessoSeletivoFormModal
          isOpen={isCreateModalOpen}
          onClose={closeCreateModal}
          onSubmitSuccess={fetchProcessosSeletivos}
        />
      )}
      {isEditModalOpen && selectedProcessoSeletivo && (
        <ProcessoSeletivoFormModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          onSubmitSuccess={fetchProcessosSeletivos}
          processoSeletivo={selectedProcessoSeletivo}
        />
      )}
      {isViewModalOpen && selectedProcessoSeletivo && (
        <ProcessoSeletivoViewModal
          isOpen={isViewModalOpen}
          onClose={closeViewModal}
          processoSeletivo={selectedProcessoSeletivo}
        />
      )}
    </div>
  )
}

export default AdminProcessosSeletivos