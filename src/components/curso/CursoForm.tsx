import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { cursoService } from "../../services/cursoService"
import type { CreateCursoDto, UpdateCursoDto } from "../../types/curso"
import "./CursoForm.css"

interface CursoFormProps {
  isEditing: boolean
}

const CursoForm: React.FC<CursoFormProps> = ({ isEditing }) => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [formData, setFormData] = useState<CreateCursoDto | UpdateCursoDto>({
    nome: "",
    link_documento_capes: "",
    link_detalhes_curso: "",
    data_criacao: new Date(),
  })

  useEffect(() => {
    if (isEditing && id) {
      fetchCurso(Number.parseInt(id))
    }
  }, [isEditing, id])

  const fetchCurso = async (cursoId: number) => {
    try {
      const curso = await cursoService.getById(cursoId)
      setFormData(curso)
    } catch (error) {
      console.error("Erro ao buscar curso:", error)
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
        await cursoService.update(Number.parseInt(id), formData as UpdateCursoDto)
      } else {
        await cursoService.create(formData as CreateCursoDto)
      }
      navigate("/curso/list")
    } catch (error) {
      console.error("Erro ao salvar curso:", error)
    }
  }

  return (
    <div className="curso-form">
      <h2>{isEditing ? "Editar Curso" : "Criar Curso"}</h2>
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
        <button type="submit">{isEditing ? "Atualizar" : "Criar"}</button>
      </form>
    </div>
  )
}

export default CursoForm