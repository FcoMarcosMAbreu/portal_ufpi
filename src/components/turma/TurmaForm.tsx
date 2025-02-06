import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { turmaService } from "../../services/turmaService"
import { type CreateTurmaDto, type UpdateTurmaDto, PeriodoAno } from "../../types/turma"
import "./TurmaForm.css"

interface TurmaFormProps {
  isEditing: boolean
}

const TurmaForm: React.FC<TurmaFormProps> = ({ isEditing }) => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [formData, setFormData] = useState<CreateTurmaDto | UpdateTurmaDto>({
    materia: "",
    nome_turma: "",
    horarios: "",
    periodo_ano: PeriodoAno.PRIMEIRO,
    docentes: "",
  })

  useEffect(() => {
    if (isEditing && id) {
      fetchTurma(Number.parseInt(id))
    }
  }, [isEditing, id])

  const fetchTurma = async (turmaId: number) => {
    try {
      const turma = await turmaService.getById(turmaId)
      setFormData(turma)
    } catch (error) {
      console.error("Erro ao buscar turma:", error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
        await turmaService.update(Number.parseInt(id), formData as UpdateTurmaDto)
      } else {
        await turmaService.create(formData as CreateTurmaDto)
      }
      navigate("/turma/list")
    } catch (error) {
      console.error("Erro ao salvar turma:", error)
    }
  }

  return (
    <div className="turma-form">
      <h2>{isEditing ? "Editar Turma" : "Criar Turma"}</h2>
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
          <input type="text" id="horarios" name="horarios" value={formData.horarios} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="periodo_ano">Período/Ano:</label>
          <select id="periodo_ano" name="periodo_ano" value={formData.periodo_ano} onChange={handleChange} required>
            <option value={PeriodoAno.PRIMEIRO}>{PeriodoAno.PRIMEIRO}</option>
            <option value={PeriodoAno.SEGUNDO}>{PeriodoAno.SEGUNDO}</option>
          </select>
        </div>
        <div>
          <label htmlFor="docentes">Docentes:</label>
          <input type="text" id="docentes" name="docentes" value={formData.docentes} onChange={handleChange} required />
        </div>
        <button type="submit">{isEditing ? "Atualizar" : "Criar"}</button>
      </form>
    </div>
  )
}

export default TurmaForm

