"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { professorService } from "../../services/professorService"
import type { ProfessorResponseDto, CreateProfessorDto, UpdateProfessorDto } from "../../types/professor"
import { Nivel, Vinculo } from "../../types/professor"
import "./ProfessorFormModal.css"

interface ProfessorFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmitSuccess: () => void
  professor?: ProfessorResponseDto
}

const ProfessorFormModal: React.FC<ProfessorFormModalProps> = ({ isOpen, onClose, onSubmitSuccess, professor }) => {
  const [formData, setFormData] = useState<CreateProfessorDto | UpdateProfessorDto>({
    nome: "",
    matricula: "",
    email: "",
    nivel: Nivel.GRADUACAO,
    telefone: "",
    curriculo_lattes: "",
    vinculo: Vinculo.EFETIVO,
    data_criacao: new Date(),
  })
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (professor) {
      setFormData({
        nome: professor.nome,
        matricula: professor.matricula,
        email: professor.email,
        nivel: professor.nivel,
        telefone: professor.telefone,
        curriculo_lattes: professor.curriculo_lattes,
        vinculo: professor.vinculo,
      })
    } else {
      setFormData({
        nome: "",
        matricula: "",
        email: "",
        nivel: Nivel.GRADUACAO,
        telefone: "",
        curriculo_lattes: "",
        vinculo: Vinculo.EFETIVO,
        data_criacao: new Date(),
      })
    }
  }, [professor])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      if (professor) {
        await professorService.update(professor.id, formData as UpdateProfessorDto)
      } else {
        const newProfessor = {
          ...formData,
          data_criacao: new Date(), // Ensure we always use the current date for new professors
        }
        await professorService.create(newProfessor as CreateProfessorDto)
      }
      onSubmitSuccess()
      onClose()
    } catch (error) {
      console.error("Erro ao salvar professor:", error)
      setError("Ocorreu um erro ao salvar o professor. Por favor, tente novamente.")
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{professor ? "Editar Professor" : "Criar Novo Professor"}</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nome">Nome:</label>
            <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
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
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="nivel">Nível:</label>
            <select id="nivel" name="nivel" value={formData.nivel} onChange={handleChange} required>
              {Object.values(Nivel).map((nivel) => (
                <option key={nivel} value={nivel}>
                  {nivel}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="telefone">Telefone:</label>
            <input
              type="tel"
              id="telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="curriculo_lattes">Currículo Lattes:</label>
            <input
              type="url"
              id="curriculo_lattes"
              name="curriculo_lattes"
              value={formData.curriculo_lattes}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="vinculo">Vínculo:</label>
            <select id="vinculo" name="vinculo" value={formData.vinculo} onChange={handleChange} required>
              {Object.values(Vinculo).map((vinculo) => (
                <option key={vinculo} value={vinculo}>
                  {vinculo}
                </option>
              ))}
            </select>
          </div>
          {/* Remove this block
          <div>
            <label htmlFor="data_criacao">Data de Criação:</label>
            <input
              type="date"
              id="data_criacao"
              name="data_criacao"
              value={formData.data_criacao instanceof Date ? formData.data_criacao.toISOString().split('T')[0] : formData.data_criacao}
              onChange={handleChange}
              required
            />
          </div>
          */}
          <div className="modal-buttons">
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit">{professor ? "Atualizar" : "Criar"}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProfessorFormModal