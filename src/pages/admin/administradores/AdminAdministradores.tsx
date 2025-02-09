"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { adminService } from "../../../services/adminService"
import type { AdminResponseDto } from "../../../types/admin"
import "./AdminAdministradores.css"
import AdminFormModal from "../../../components/admin/AdminFormModal"
import AdminViewModal from "../../../components/admin/AdminViewModal"

const AdminAdministradores: React.FC = () => {
  const navigate = useNavigate()
  const [admins, setAdmins] = useState<AdminResponseDto[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedAdmin, setSelectedAdmin] = useState<AdminResponseDto | null>(null)

  useEffect(() => {
    fetchAdmins()
  }, [])

  // Função para buscar administradores do banco de dados
  const fetchAdmins = async () => {
    try {
      const data = await adminService.getAll()
      setAdmins(data)
    } catch (error) {
      console.error("Erro ao buscar administradores:", error)
    }
  }

  // Função para excluir um administrador do banco de dados
  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este administrador?")) {
      try {
        await adminService.delete(id)
        fetchAdmins() // Atualiza a lista após a exclusão
      } catch (error) {
        console.error("Erro ao excluir administrador:", error)
      }
    }
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredAdmins = admins.filter(
    (admin) =>
      admin.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const openCreateModal = () => setIsCreateModalOpen(true)
  const closeCreateModal = () => setIsCreateModalOpen(false)

  const openEditModal = (admin: AdminResponseDto) => {
    setSelectedAdmin(admin)
    setIsEditModalOpen(true)
  }
  const closeEditModal = () => {
    setSelectedAdmin(null)
    setIsEditModalOpen(false)
  }

  const openViewModal = (admin: AdminResponseDto) => {
    setSelectedAdmin(admin)
    setIsViewModalOpen(true)
  }
  const closeViewModal = () => {
    setSelectedAdmin(null)
    setIsViewModalOpen(false)
  }

  return (
    <div className="admin-administradores">
      <h2>Lista de Administradores</h2>
      <div className="admin-administradores-actions">
        <div className="action-buttons">
          <button onClick={() => navigate("/admin")} className="btn-back">
            Voltar
          </button>
          <button onClick={openCreateModal} className="btn-create">
            Criar Novo Administrador
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
            <th>Cargo</th>
            <th>Departamento</th>
            <th>Data de Criação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdmins.map((admin) => (
            <tr key={admin.id}>
              <td>{admin.nome}</td>
              <td>{admin.email}</td>
              <td>{admin.cargo}</td>
              <td>{admin.departamento}</td>
              <td>{new Date(admin.data_criacao).toLocaleDateString()}</td>
              <td>
                <button onClick={() => openViewModal(admin)} className="btn-view">
                  Visualizar
                </button>
                <button onClick={() => openEditModal(admin)} className="btn-edit">
                  Editar
                </button>
                <button onClick={() => handleDelete(admin.id)} className="btn-delete">
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isCreateModalOpen && (
        <AdminFormModal isOpen={isCreateModalOpen} onClose={closeCreateModal} onSubmitSuccess={fetchAdmins} />
      )}
      {isEditModalOpen && selectedAdmin && (
        <AdminFormModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          onSubmitSuccess={fetchAdmins}
          admin={selectedAdmin}
        />
      )}
      {isViewModalOpen && selectedAdmin && (
        <AdminViewModal isOpen={isViewModalOpen} onClose={closeViewModal} admin={selectedAdmin} />
      )}
    </div>
  )
}

export default AdminAdministradores