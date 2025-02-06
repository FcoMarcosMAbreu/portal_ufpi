import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { documentoService } from "../../services/documentoService"
import { type CreateDocumentoDto, type UpdateDocumentoDto, TipoDocumento, TagDocumento } from "../../types/documento"
import "./DocumentoForm.css"

interface DocumentoFormProps {
  isEditing: boolean
}

const DocumentoForm: React.FC<DocumentoFormProps> = ({ isEditing }) => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [formData, setFormData] = useState<CreateDocumentoDto | UpdateDocumentoDto>({
    nome: "",
    tipo: TipoDocumento.PDF,
    tag: TagDocumento.OUTROS,
    arquivo: null as unknown as File,
  })

  useEffect(() => {
    if (isEditing && id) {
      fetchDocumento(Number.parseInt(id))
    }
  }, [isEditing, id])

  const fetchDocumento = async (documentoId: number) => {
    try {
      const documento = await documentoService.getById(documentoId)
      setFormData({
        nome: documento.nome,
        tipo: documento.tipo,
        tag: documento.tag,
      })
    } catch (error) {
      console.error("Erro ao buscar documento:", error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prevState) => ({
        ...prevState,
        arquivo: e.target.files![0],
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (isEditing && id) {
        await documentoService.update(Number.parseInt(id), formData as UpdateDocumentoDto)
      } else {
        await documentoService.create(formData as CreateDocumentoDto)
      }
      navigate("/documento/list")
    } catch (error) {
      console.error("Erro ao salvar documento:", error)
    }
  }

  return (
    <div className="documento-form">
      <h2>{isEditing ? "Editar Documento" : "Criar Documento"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="tipo">Tipo:</label>
          <select id="tipo" name="tipo" value={formData.tipo} onChange={handleChange} required>
            {Object.values(TipoDocumento).map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="tag">Categoria:</label>
          <select id="tag" name="tag" value={formData.tag} onChange={handleChange} required>
            {Object.values(TagDocumento).map((tag) => (
              <option key={tag} value={tag}>
                {tag.replace("_", " ")}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="arquivo">Arquivo:</label>
          <input type="file" id="arquivo" name="arquivo" onChange={handleFileChange} required={!isEditing} />
        </div>
        <button type="submit">{isEditing ? "Atualizar" : "Criar"}</button>
      </form>
    </div>
  )
}

export default DocumentoForm