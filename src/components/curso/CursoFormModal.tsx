"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { cursoService } from "../../services/cursoService"
import type { CursoResponseDto, CreateCursoDto, UpdateCursoDto } from "../../types/curso"
import { tipoEnumCurso } from "../../types/curso"
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
    tipo_pos: tipoEnumCurso.Mestrado,
  })
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (curso) {
      setFormData({
        nome: curso.nome,
        link_documento_capes: curso.link_documento_capes,
        link_detalhes_curso: curso.link_detalhes_curso,
        tipo_pos: curso.tipo_pos,
      })
    } else {
      setFormData({
        nome: "",
        link_documento_capes: "",
        link_detalhes_curso: "",
        tipo_pos: tipoEnumCurso.Mestrado,
      })
    }
  }, [curso])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      if (curso) {
        await cursoService.update(curso.id, formData as UpdateCursoDto)
      } else {
        const newCurso = {
          ...formData,
          data_criacao: new Date(), // Automatically set creation date for new courses
        }
        await cursoService.create(newCurso as CreateCursoDto)
      }
      onSubmitSuccess()
      onClose()
    } catch (error) {
      console.error("Erro ao salvar curso:", error)
      setError("Ocorreu um erro ao salvar o curso. Por favor, tente novamente.")
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{curso ? "Editar Curso" : "Criar Novo Curso"}</h2>
        {error && <p className="error-message">{error}</p>}
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
          <div>
            <label htmlFor="tipo_pos">Tipo de Pós-Graduação:</label>
            <select id="tipo_pos" name="tipo_pos" value={formData.tipo_pos} onChange={handleChange} required>
              {Object.values(tipoEnumCurso).map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>
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

