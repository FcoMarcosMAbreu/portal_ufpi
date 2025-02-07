"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { adminService } from "../../../services/adminService"
import type { AdminResponseDto } from "../../../types/admin"
import "./AdminAdministradores.css"

const AdminAdministradores: React.FC = () => {
  const [admins, setAdmins] = useState<AdminResponseDto[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")

  useEffect(() => {
    fetchAdmins()
  }, [])

  const fetchAdmins = async () => {
    try {
      const data = await adminService.getAll()
      setAdmins(data)
    } catch (error) {
      console.error("Erro ao buscar administradores:", error)
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este administrador?")) {
      try {
        await adminService.delete(id)
        fetchAdmins()
      } catch (error) {
        console.error("Erro ao excluir administrador:", error)
      }
    }
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredAdmins = admins.filter((admin) => admin.nome.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="admin-administradores">
      <h2>Lista de Administradores</h2>
      <div className="admin-administradores-actions">
        <div className="action-buttons">
          <Link to="/admin" className="btn-back">
            Voltar
          </Link>
          <Link to="/admin/administradores/create" className="btn-create">
            Criar Novo Administrador
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
                <Link to={`/admin/administradores/view/${admin.id}`} className="btn-view">
                  Visualizar
                </Link>
                <Link to={`/admin/administradores/edit/${admin.id}`} className="btn-edit">
                  Editar
                </Link>
                <button onClick={() => handleDelete(admin.id)} className="btn-delete">
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

export default AdminAdministradores