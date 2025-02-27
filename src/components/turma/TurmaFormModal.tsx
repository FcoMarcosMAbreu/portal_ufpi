"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { turmaService } from "../../services/turmaService"
import type { TurmaDto, CreateTurmaDto, UpdateTurmaDto } from "../../types/turma"
import { PeriodoAno } from "../../types/turma"
import "./TurmaFormModal.css"

interface TurmaFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmitSuccess: () => void
  turma?: TurmaDto
}

const TurmaFormModal: React.FC<TurmaFormModalProps> = ({ isOpen, onClose, onSubmitSuccess, turma }) => {
  const [formData, setFormData] = useState<CreateTurmaDto | UpdateTurmaDto>({
    materia: "",
    nome_turma: "",
    horarios: "",
    periodo_ano: PeriodoAno.PRIMEIRO,
    docentes: "",
  })
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (turma) {
      setFormData({
        materia: turma.materia,
        nome_turma: turma.nome_turma,
        horarios: turma.horarios,
        periodo_ano: turma.periodo_ano,
        docentes: turma.docentes,
      })
    } else {
      setFormData({
        materia: "",
        nome_turma: "",
        horarios: "",
        periodo_ano: PeriodoAno.PRIMEIRO,
        docentes: "",
      })
    }
  }, [turma])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      if (turma) {
        await turmaService.update(turma.id, formData as UpdateTurmaDto)
      } else {
        await turmaService.create(formData as CreateTurmaDto)
      }
      onSubmitSuccess()
      onClose()
    } catch (error) {
      console.error("Erro ao salvar turma:", error)
      if (error instanceof Error) {
        setError(`Erro ao salvar turma: ${error.message}`)
      } else {
        setError("Ocorreu um erro desconhecido ao salvar a turma. Por favor, tente novamente.")
      }
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{turma ? "Editar Turma" : "Criar Nova Turma"}</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="materia">Matéria:</label>
            <input type="text" id="materia" name="materia" value={formData.materia} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="nome_turma">Nome da Turma:</label>
            <input
              type="text"
              id="nome_turma"
              name="nome_turma"
              value={formData.nome_turma}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="horarios">Horários:</label>
            <input
              type="text"
              id="horarios"
              name="horarios"
              value={formData.horarios}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="periodo_ano">Período/Ano:</label>
            <select id="periodo_ano" name="periodo_ano" value={formData.periodo_ano} onChange={handleChange} required>
              {Object.values(PeriodoAno).map((periodo) => (
                <option key={periodo} value={periodo}>
                  {periodo}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="docentes">Docentes:</label>
            <input
              type="text"
              id="docentes"
              name="docentes"
              value={formData.docentes}
              onChange={handleChange}
              required
            />
          </div>
          <div className="modal-buttons">
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit">{turma ? "Atualizar" : "Criar"}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TurmaFormModal

