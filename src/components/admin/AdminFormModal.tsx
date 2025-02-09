"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { adminService } from "../../services/adminService"
import type { AdminResponseDto, CreateAdminDto, UpdateAdminDto } from "../../types/admin"
import "./AdminFormModal.css"

interface AdminFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmitSuccess: () => void
  admin?: AdminResponseDto
}

const AdminFormModal: React.FC<AdminFormModalProps> = ({ isOpen, onClose, onSubmitSuccess, admin }) => {
  const [formData, setFormData] = useState<CreateAdminDto | UpdateAdminDto>({
    nome: "",
    email: "",
    senha: "",
    cargo: "",
    departamento: "",
  })

  useEffect(() => {
    if (admin) {
      setFormData({
        nome: admin.nome,
        email: admin.email,
        cargo: admin.cargo,
        departamento: admin.departamento,
      })
    } else {
      setFormData({
        nome: "",
        email: "",
        senha: "",
        cargo: "",
        departamento: "",
      })
    }
  }, [admin])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (admin) {
        await adminService.update(admin.id, formData as UpdateAdminDto)
      } else {
        await adminService.create(formData as CreateAdminDto)
      }
      onSubmitSuccess()
      onClose()
    } catch (error) {
      console.error("Erro ao salvar administrador:", error)
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{admin ? "Editar Administrador" : "Criar Novo Administrador"}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nome">Nome:</label>
            <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          {!admin && (
            <div>
              <label htmlFor="senha">Senha:</label>
              <input type="password" id="senha" name="senha" value={formData.senha} onChange={handleChange} required />
            </div>
          )}
          <div>
            <label htmlFor="cargo">Cargo:</label>
            <input type="text" id="cargo" name="cargo" value={formData.cargo} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="departamento">Departamento:</label>
            <input
              type="text"
              id="departamento"
              name="departamento"
              value={formData.departamento}
              onChange={handleChange}
              required
            />
          </div>
          <div className="modal-buttons">
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit">{admin ? "Atualizar" : "Criar"}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminFormModal