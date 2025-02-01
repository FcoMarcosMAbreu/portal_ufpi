import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { calendarioService } from "../../services/calendarioService"
import type { CreateCalendarioDto, UpdateCalendarioDto } from "../../types/calendario"
import "./CalendarioForm.css"

interface CalendarioFormProps {
  isEditing: boolean
}

const CalendarioForm: React.FC<CalendarioFormProps> = ({ isEditing }) => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [formData, setFormData] = useState<CreateCalendarioDto | UpdateCalendarioDto>({
    titulo: "",
    descricao: "",
    data_inicio: "",
    data_termino: "",
  })

  useEffect(() => {
    if (isEditing && id) {
      fetchCalendario(Number.parseInt(id))
    }
  }, [isEditing, id])

  const fetchCalendario = async (calendarioId: number) => {
    try {
      const calendario = await calendarioService.getById(calendarioId)
      setFormData({
        titulo: calendario.titulo,
        descricao: calendario.descricao,
        data_inicio: calendario.data_inicio,
        data_termino: calendario.data_termino,
      })
    } catch (error) {
      console.error("Erro ao buscar evento do calendário:", error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        await calendarioService.update(Number.parseInt(id), formData as UpdateCalendarioDto)
      } else {
        await calendarioService.create(formData as CreateCalendarioDto)
      }
      navigate("/calendario/list")
    } catch (error) {
      console.error("Erro ao salvar evento do calendário:", error)
    }
  }

  return (
    <div className="calendario-form">
      <h2>{isEditing ? "Editar Evento do Calendário" : "Criar Evento do Calendário"}</h2>
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
        <button type="submit">{isEditing ? "Atualizar" : "Criar"}</button>
      </form>
    </div>
  )
}

export default CalendarioForm