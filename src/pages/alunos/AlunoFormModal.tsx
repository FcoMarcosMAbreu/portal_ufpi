"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { alunoService } from "../../services/alunoService"
import type { AlunoResponseDto, CreateAlunoDto, UpdateAlunoDto } from "../../types/aluno"
import "./AlunoFormModal.css"

interface AlunoFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmitSuccess: () => void
  aluno?: AlunoResponseDto
}

const AlunoFormModal: React.FC<AlunoFormModalProps> = ({ isOpen, onClose, onSubmitSuccess, aluno }) => {
  const [formData, setFormData] = useState<CreateAlunoDto | UpdateAlunoDto>({
    nome: "",
    email: "",
    matricula: "",
    curso: "",
  })

  useEffect(() => {
    if (aluno) {
      setFormData(aluno)
    } else {
      setFormData({
        nome: "",
        email: "",
        matricula: "",
        curso: "",
      })
    }
  }, [aluno])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (aluno) {
        await alunoService.update(aluno.id, formData as UpdateAlunoDto)
      } else {
        await alunoService.create(formData as CreateAlunoDto)
      }
      onSubmitSuccess()
      onClose()
    } catch (error) {
      console.error("Erro ao salvar aluno:", error)
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{aluno ? "Editar Aluno" : "Criar Novo Aluno"}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nome">Nome:</label>
            <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="matricula">Matrícula:</label>
            <input
              type="text"
              id="matricula"
              name="matricula"
              value={formData.matricula}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="curso">Curso:</label>
            <input type="text" id="curso" name="curso" value={formData.curso} onChange={handleChange} required />
          </div>
          <div className="modal-buttons">
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit">{aluno ? "Atualizar" : "Criar"}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AlunoFormModal