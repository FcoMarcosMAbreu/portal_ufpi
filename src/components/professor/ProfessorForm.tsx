import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { professorService } from "../../services/professorService"
import { type CreateProfessorDto, type UpdateProfessorDto, Nivel, Vinculo } from "../../types/professor"
import "./ProfessorForm.css"

interface ProfessorFormProps {
  isEditing: boolean
}

const ProfessorForm: React.FC<ProfessorFormProps> = ({ isEditing }) => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
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

  useEffect(() => {
    if (isEditing && id) {
      fetchProfessor(Number.parseInt(id))
    }
  }, [isEditing, id])

  const fetchProfessor = async (professorId: number) => {
    try {
      const professor = await professorService.getById(professorId)
      setFormData(professor)
    } catch (error) {
      console.error("Erro ao buscar professor:", error)
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
        await professorService.update(Number.parseInt(id), formData as UpdateProfessorDto)
      } else {
        await professorService.create(formData as CreateProfessorDto)
      }
      navigate("/professor/list")
    } catch (error) {
      console.error("Erro ao salvar professor:", error)
    }
  }

  return (
    <div className="professor-form">
      <h2>{isEditing ? "Editar Professor" : "Criar Professor"}</h2>
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
          <input type="tel" id="telefone" name="telefone" value={formData.telefone} onChange={handleChange} required />
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
        <button type="submit">{isEditing ? "Atualizar" : "Criar"}</button>
      </form>
    </div>
  )
}

export default ProfessorForm

