import type React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { adminService } from "../../services/adminService"
import type { AdminResponseDto } from "../../types/admin"
import "./AdminList.css"

const AdminList: React.FC = () => {
  const [admins, setAdmins] = useState<AdminResponseDto[]>([])

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

  return (
    <div className="admin-list">
      <h2>Lista de Administradores</h2>
      <Link to="/admin/create" className="btn-create">
        Criar Novo Administrador
      </Link>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Cargo</th>
            <th>Departamento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id}>
              <td>{admin.nome}</td>
              <td>{admin.email}</td>
              <td>{admin.cargo}</td>
              <td>{admin.departamento}</td>
              <td>
                <Link to={`/admin/edit/${admin.id}`} className="btn-edit">
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

export default AdminList