import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { adminService } from "../../services/adminService"
import type { CreateAdminDto, UpdateAdminDto } from "../../types/admin"
import "./AdminForm.css"

interface AdminFormProps {
  isEditing: boolean
}

const AdminForm: React.FC<AdminFormProps> = ({ isEditing }) => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [formData, setFormData] = useState<CreateAdminDto | UpdateAdminDto>({
    nome: "",
    email: "",
    senha: "",
    cargo: "",
    departamento: "",
  })

  useEffect(() => {
    if (isEditing && id) {
      fetchAdmin(Number.parseInt(id))
    }
  }, [isEditing, id])

  const fetchAdmin = async (adminId: number) => {
    try {
      const admin = await adminService.getById(adminId)
      setFormData({
        nome: admin.nome,
        email: admin.email,
        cargo: admin.cargo,
        departamento: admin.departamento,
      })
    } catch (error) {
      console.error("Erro ao buscar administrador:", error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (isEditing && id) {
        await adminService.update(Number.parseInt(id), formData as UpdateAdminDto)
      } else {
        await adminService.create(formData as CreateAdminDto)
      }
      navigate("/admin/list")
    } catch (error) {
      console.error("Erro ao salvar administrador:", error)
    }
  }

  return (
    <div className="admin-form">
      <h2>{isEditing ? "Editar Administrador" : "Criar Administrador"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        {!isEditing && (
          <div>
            <label htmlFor="senha">Senha:</label>
            <input type="password" id="senha" name="senha" value={formData.senha} onChange={handleChange} required />
          </div>
        )}
        <div>
          <label htmlFor="cargo">Cargo:</label>
          <input type="text" id="cargo" name="cargo" value={formData.cargo} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="departamento">Departamento:</label>
          <input
            type="text"
            id="departamento"
            name="departamento"
            value={formData.departamento}
            onChange={handleChange}
          />
        </div>
        <button type="submit">{isEditing ? "Atualizar" : "Criar"}</button>
      </form>
    </div>
  )
}

export default AdminForm