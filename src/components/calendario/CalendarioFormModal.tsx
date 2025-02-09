"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { calendarioService } from "../../services/calendarioService"
import type { CalendarioDto, CreateCalendarioDto, UpdateCalendarioDto } from "../../types/calendario"
import "./CalendarioFormModal.css"

interface CalendarioFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmitSuccess: () => void
  calendario?: CalendarioDto
}

const CalendarioFormModal: React.FC<CalendarioFormModalProps> = ({ isOpen, onClose, onSubmitSuccess, calendario }) => {
  const [formData, setFormData] = useState<CreateCalendarioDto | UpdateCalendarioDto>({
    titulo: "",
    descricao: "",
    data_inicio: "",
    data_termino: "",
  })

  useEffect(() => {
    if (calendario) {
      setFormData({
        titulo: calendario.titulo,
        descricao: calendario.descricao,
        data_inicio: calendario.data_inicio,
        data_termino: calendario.data_termino,
      })
    } else {
      setFormData({
        titulo: "",
        descricao: "",
        data_inicio: "",
        data_termino: "",
      })
    }
  }, [calendario])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (calendario) {
        await calendarioService.update(calendario.id, formData as UpdateCalendarioDto)
      } else {
        await calendarioService.create(formData as CreateCalendarioDto)
      }
      onSubmitSuccess()
      onClose()
    } catch (error) {
      console.error("Erro ao salvar evento do calendário:", error)
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{calendario ? "Editar Evento do Calendário" : "Criar Novo Evento do Calendário"}</h2>
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
            <label htmlFor="data_inicio">Data de Início:</label>
            <input
              type="date"
              id="data_inicio"
              name="data_inicio"
              value={formData.data_inicio}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="data_termino">Data de Término:</label>
            <input
              type="date"
              id="data_termino"
              name="data_termino"
              value={formData.data_termino}
              onChange={handleChange}
              required
            />
          </div>
          <div className="modal-buttons">
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit">{calendario ? "Atualizar" : "Criar"}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CalendarioFormModal