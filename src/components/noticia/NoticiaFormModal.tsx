"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { noticiaService } from "../../services/noticiaService"
import type { NoticiaDto, CreateNoticiaDto, UpdateNoticiaDto } from "../../types/noticia"
import { TagNoticia } from "../../types/noticia"
import "./NoticiaFormModal.css"

interface NoticiaFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmitSuccess: () => void
  noticia?: NoticiaDto
}

const NoticiaFormModal: React.FC<NoticiaFormModalProps> = ({ isOpen, onClose, onSubmitSuccess, noticia }) => {
  const [formData, setFormData] = useState<CreateNoticiaDto | UpdateNoticiaDto>({
    titulo: "",
    tag: TagNoticia.Informativo,
    conteudo: "",
    links_referencia: "",
    arquivo: undefined,
    data_criacao: new Date(),
  })
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (noticia) {
      setFormData({
        titulo: noticia.titulo,
        tag: noticia.tag,
        conteudo: noticia.conteudo,
        links_referencia: noticia.links_referencia,
        data_criacao: new Date(noticia.data_criacao),
      })
    } else {
      setFormData({
        titulo: "",
        tag: TagNoticia.Informativo,
        conteudo: "",
        links_referencia: "",
        arquivo: undefined,
        data_criacao: new Date(),
      })
    }
  }, [noticia])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
    setError(null)
    try {
      const formDataToSend = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined) {
          if (key === "arquivo" && value instanceof File) {
            formDataToSend.append(key, value)
          } else if (key === "data_criacao" && value instanceof Date) {
            formDataToSend.append(key, value.toISOString())
          } else {
            formDataToSend.append(key, String(value))
          }
        }
      })

      if (noticia) {
        await noticiaService.update(noticia.id, formDataToSend)
      } else {
        await noticiaService.create(formDataToSend)
      }
      onSubmitSuccess()
      onClose()
    } catch (error) {
      console.error("Erro ao salvar notícia:", error)
      setError("Ocorreu um erro ao salvar a notícia. Por favor, tente novamente.")
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{noticia ? "Editar Notícia" : "Criar Nova Notícia"}</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="titulo">Título:</label>
            <input type="text" id="titulo" name="titulo" value={formData.titulo} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="tag">Tag:</label>
            <select id="tag" name="tag" value={formData.tag} onChange={handleChange} required>
              {Object.values(TagNoticia).map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="conteudo">Conteúdo:</label>
            <textarea id="conteudo" name="conteudo" value={formData.conteudo} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="links_referencia">Links de Referência:</label>
            <input
              type="text"
              id="links_referencia"
              name="links_referencia"
              value={formData.links_referencia}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="arquivo">Arquivo:</label>
            <input type="file" id="arquivo" name="arquivo" onChange={handleFileChange} />
          </div>
          <div>
            <label htmlFor="data_criacao">Data de Criação:</label>
            <input
              type="datetime-local"
              id="data_criacao"
              name="data_criacao"
              value={
                formData.data_criacao instanceof Date
                  ? formData.data_criacao.toISOString().slice(0, 16)
                  : formData.data_criacao
              }
              onChange={handleChange}
              required
            />
          </div>
          <div className="modal-buttons">
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit">{noticia ? "Atualizar" : "Criar"}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NoticiaFormModal

