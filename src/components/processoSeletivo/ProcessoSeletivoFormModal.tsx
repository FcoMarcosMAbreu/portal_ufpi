"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { processoSeletivoService } from "../../services/processoSeletivoService"
import type {
  ProcessoSeletivoDto,
  CreateProcessoSeletivoDto,
  UpdateProcessoSeletivoDto,
} from "../../types/processoSeletivo"
import "./ProcessoSeletivoFormModal.css"

interface ProcessoSeletivoFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmitSuccess: () => void
  processoSeletivo?: ProcessoSeletivoDto
}

const ProcessoSeletivoFormModal: React.FC<ProcessoSeletivoFormModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
  processoSeletivo,
}) => {
  const [formData, setFormData] = useState<CreateProcessoSeletivoDto | UpdateProcessoSeletivoDto>({
    titulo: "",
    descricao: "",
    link_inscricao: "",
  })

  useEffect(() => {
    if (processoSeletivo) {
      setFormData({
        titulo: processoSeletivo.titulo,
        descricao: processoSeletivo.descricao,
        link_inscricao: processoSeletivo.link_inscricao,
      })
    } else {
      setFormData({
        titulo: "",
        descricao: "",
        link_inscricao: "",
      })
    }
  }, [processoSeletivo])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (processoSeletivo) {
        await processoSeletivoService.update(processoSeletivo.id, formData as UpdateProcessoSeletivoDto)
      } else {
        await processoSeletivoService.create(formData as CreateProcessoSeletivoDto)
      }
      onSubmitSuccess()
      onClose()
    } catch (error) {
      console.error("Erro ao salvar processo seletivo:", error)
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{processoSeletivo ? "Editar Processo Seletivo" : "Criar Novo Processo Seletivo"}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="titulo">Título:</label>
            <input type="text" id="titulo" name="titulo" value={formData.titulo} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="descricao">Descrição:</label>
            <textarea id="descricao" name="descricao" value={formData.descricao} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="link_inscricao">Link de Inscrição:</label>
            <input
              type="url"
              id="link_inscricao"
              name="link_inscricao"
              value={formData.link_inscricao}
              onChange={handleChange}
              required
            />
          </div>
          <div className="modal-buttons">
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit">{processoSeletivo ? "Atualizar" : "Criar"}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProcessoSeletivoFormModal