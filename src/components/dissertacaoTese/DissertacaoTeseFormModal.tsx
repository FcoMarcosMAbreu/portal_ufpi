"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { dissertacaoTeseService } from "../../services/dissertacaoTeseService"
import type {
  DissertacaoTeseDto,
  CreateDissertacaoTeseDto,
  UpdateDissertacaoTeseDto,
} from "../../types/dissertacaoTese"
import "./DissertacaoTeseFormModal.css"

interface DissertacaoTeseFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmitSuccess: () => void
  dissertacaoTese?: DissertacaoTeseDto
}

const DissertacaoTeseFormModal: React.FC<DissertacaoTeseFormModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
  dissertacaoTese,
}) => {
  const [formData, setFormData] = useState<CreateDissertacaoTeseDto | UpdateDissertacaoTeseDto>({
    nome_autor: "",
    titulo: "",
    orientador: "",
    data: "",
    resumo: "",
  })

  useEffect(() => {
    if (dissertacaoTese) {
      setFormData({
        nome_autor: dissertacaoTese.nome_autor,
        titulo: dissertacaoTese.titulo,
        orientador: dissertacaoTese.orientador,
        data: dissertacaoTese.data,
        resumo: dissertacaoTese.resumo,
      })
    } else {
      setFormData({
        nome_autor: "",
        titulo: "",
        orientador: "",
        data: "",
        resumo: "",
      })
    }
  }, [dissertacaoTese])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (dissertacaoTese) {
        await dissertacaoTeseService.update(dissertacaoTese.id, formData as UpdateDissertacaoTeseDto)
      } else {
        await dissertacaoTeseService.create(formData as CreateDissertacaoTeseDto)
      }
      onSubmitSuccess()
      onClose()
    } catch (error) {
      console.error("Erro ao salvar dissertação/tese:", error)
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{dissertacaoTese ? "Editar Dissertação/Tese" : "Criar Nova Dissertação/Tese"}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nome_autor">Nome do Autor:</label>
            <input
              type="text"
              id="nome_autor"
              name="nome_autor"
              value={formData.nome_autor}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="titulo">Título:</label>
            <input type="text" id="titulo" name="titulo" value={formData.titulo} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="orientador">Orientador:</label>
            <input
              type="text"
              id="orientador"
              name="orientador"
              value={formData.orientador}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="data">Data:</label>
            <input type="date" id="data" name="data" value={formData.data} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="resumo">Resumo:</label>
            <textarea id="resumo" name="resumo" value={formData.resumo} onChange={handleChange} required />
          </div>
          <div className="modal-buttons">
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit">{dissertacaoTese ? "Atualizar" : "Criar"}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default DissertacaoTeseFormModal