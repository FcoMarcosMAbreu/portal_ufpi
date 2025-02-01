import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { alunoService } from "../../services/alunoService"
import type { CreateAlunoDto, UpdateAlunoDto } from "../../types/aluno"
import "./AlunoForm.css"

interface AlunoFormProps {
  isEditing: boolean
}

const AlunoForm: React.FC<AlunoFormProps> = ({ isEditing }) => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [formData, setFormData] = useState<CreateAlunoDto | UpdateAlunoDto>({
    nome: "",
    email: "",
    matricula: "",
    curso: "",
  })

  useEffect(() => {
    if (isEditing && id) {
      fetchAluno(Number.parseInt(id))
    }
  }, [isEditing, id])

  const fetchAluno = async (alunoId: number) => {
    try {
      const aluno = await alunoService.getById(alunoId)
      setFormData(aluno)
    } catch (error) {
      console.error("Erro ao buscar aluno:", error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        await alunoService.update(Number.parseInt(id), formData as UpdateAlunoDto)
      } else {
        await alunoService.create(formData as CreateAlunoDto)
      }
      navigate("/aluno/list")
    } catch (error) {
      console.error("Erro ao salvar aluno:", error)
    }
  }

  return (
    <div className="aluno-form">
      <h2>{isEditing ? "Editar Aluno" : "Criar Aluno"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
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
          <label htmlFor="curso">Curso:</label>
          <input type="text" id="curso" name="curso" value={formData.curso} onChange={handleChange} required />
        </div>
        <button type="submit">{isEditing ? "Atualizar" : "Criar"}</button>
      </form>
    </div>
  )
}

export default AlunoForm