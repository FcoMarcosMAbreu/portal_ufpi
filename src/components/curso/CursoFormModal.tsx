"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { cursoService } from "../../services/cursoService"
import type { CursoResponseDto, CreateCursoDto, UpdateCursoDto } from "../../types/curso"
import "./CursoFormModal.css"

interface CursoFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmitSuccess: () => void
  curso?: CursoResponseDto
}

const CursoFormModal: React.FC<CursoFormModalProps> = ({ isOpen, onClose, onSubmitSuccess, curso }) => {
  const [formData, setFormData] = useState<CreateCursoDto | UpdateCursoDto>({
    nome: "",
    link_documento_capes: "",
    link_detalhes_curso: "",
  })

  useEffect(() => {
    if (curso) {
      setFormData({
        nome: curso.nome,
        link_documento_capes: curso.link_documento_capes,
        link_detalhes_curso: curso.link_detalhes_curso,
      })
    } else {
      setFormData({
        nome: "",
        link_documento_capes: "",
        link_detalhes_curso: "",
      })
    }
  }, [curso])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (curso) {
        await cursoService.update(curso.id, formData as UpdateCursoDto)
      } else {
        await cursoService.create(formData as CreateCursoDto)
      }
      onSubmitSuccess()
      onClose()
    } catch (error) {
      console.error("Erro ao salvar curso:", error)
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{curso ? "Editar Curso" : "Criar Novo Curso"}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nome">Nome:</label>
            <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="link_documento_capes">Link Documento CAPES:</label>
            <input
              type="url"
              id="link_documento_capes"
              name="link_documento_capes"
              value={formData.link_documento_capes}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="link_detalhes_curso">Link Detalhes do Curso:</label>
            <input
              type="url"
              id="link_detalhes_curso"
              name="link_detalhes_curso"
              value={formData.link_detalhes_curso}
              onChange={handleChange}
              required
            />
          </div>
          <div className="modal-buttons">
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit">{curso ? "Atualizar" : "Criar"}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CursoFormModal

