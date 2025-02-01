import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { processoSeletivoService } from "../../services/processoSeletivoService"
import type { CreateProcessoSeletivoDto, UpdateProcessoSeletivoDto } from "../../types/processoSeletivo"
import "./ProcessoSeletivoForm.css"

interface ProcessoSeletivoFormProps {
  isEditing: boolean
}

const ProcessoSeletivoForm: React.FC<ProcessoSeletivoFormProps> = ({ isEditing }) => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [formData, setFormData] = useState<CreateProcessoSeletivoDto | UpdateProcessoSeletivoDto>({
    titulo: "",
    descricao: "",
    link_inscricao: "",
  })

  useEffect(() => {
    if (isEditing && id) {
      fetchProcessoSeletivo(Number.parseInt(id))
    }
  }, [isEditing, id])

  const fetchProcessoSeletivo = async (processoSeletivoId: number) => {
    try {
      const processoSeletivo = await processoSeletivoService.getById(processoSeletivoId)
      setFormData({
        titulo: processoSeletivo.titulo,
        descricao: processoSeletivo.descricao,
        link_inscricao: processoSeletivo.link_inscricao,
      })
    } catch (error) {
      console.error("Erro ao buscar processo seletivo:", error)
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
        await processoSeletivoService.update(Number.parseInt(id), formData as UpdateProcessoSeletivoDto)
      } else {
        await processoSeletivoService.create(formData as CreateProcessoSeletivoDto)
      }
      navigate("/processo-seletivo/list")
    } catch (error) {
      console.error("Erro ao salvar processo seletivo:", error)
    }
  }

  return (
    <div className="processo-seletivo-form">
      <h2>{isEditing ? "Editar Processo Seletivo" : "Criar Processo Seletivo"}</h2>
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
        <button type="submit">{isEditing ? "Atualizar" : "Criar"}</button>
      </form>
    </div>
  )
}

export default ProcessoSeletivoForm