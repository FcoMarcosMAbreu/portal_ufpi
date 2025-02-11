"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { documentoService } from "../../services/documentoService"
import type { DocumentoResponseDto, CreateDocumentoDto, UpdateDocumentoDto } from "../../types/documento"
import { TipoDocumento, TagDocumento } from "../../types/documento"
import "./DocumentoFormModal.css"

interface DocumentoFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmitSuccess: () => void
  documento?: DocumentoResponseDto
}

const DocumentoFormModal: React.FC<DocumentoFormModalProps> = ({ isOpen, onClose, onSubmitSuccess, documento }) => {
  const [formData, setFormData] = useState<CreateDocumentoDto | UpdateDocumentoDto>({
    nome: "",
    tipo: TipoDocumento.PDF,
    tag: TagDocumento.OUTROS,
    arquivo: null as unknown as File,
  })

  useEffect(() => {
    if (documento) {
      setFormData({
        nome: documento.nome,
        tipo: documento.tipo,
        tag: documento.tag,
      })
    } else {
      setFormData({
        nome: "",
        tipo: TipoDocumento.PDF,
        tag: TagDocumento.OUTROS,
        arquivo: null as unknown as File,
      })
    }
  }, [documento])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, arquivo: e.target.files![0] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (documento) {
        await documentoService.update(documento.id, formData as UpdateDocumentoDto)
      } else {
        await documentoService.create(formData as CreateDocumentoDto)
      }
      onSubmitSuccess()
      onClose()
    } catch (error) {
      console.error("Erro ao salvar documento:", error)
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{documento ? "Editar Documento" : "Criar Novo Documento"}</h2>
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
            <label htmlFor="tag">Tag:</label>
            <select id="tag" name="tag" value={formData.tag} onChange={handleChange} required>
              {Object.values(TagDocumento).map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="arquivo">Arquivo:</label>
            <input type="file" id="arquivo" name="arquivo" onChange={handleFileChange} required={!documento} />
          </div>
          <div className="modal-buttons">
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit">{documento ? "Atualizar" : "Criar"}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default DocumentoFormModal

