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
    data_criacao: new Date(),
  })

  useEffect(() => {
    if (noticia) {
      setFormData({
        titulo: noticia.titulo,
        tag: noticia.tag,
        conteudo: noticia.conteudo,
        links_referencia: noticia.links_referencia,
        data_criacao: noticia.data_criacao,
      })
    } else {
      setFormData({
        titulo: "",
        tag: TagNoticia.Informativo,
        conteudo: "",
        links_referencia: "",
        data_criacao: new Date(),
      })
    }
  }, [noticia])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (noticia) {
        await noticiaService.update(noticia.id, formData as UpdateNoticiaDto)
      } else {
        await noticiaService.create(formData as CreateNoticiaDto)
      }
      onSubmitSuccess()
      onClose()
    } catch (error) {
      console.error("Erro ao salvar notícia:", error)
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{noticia ? "Editar Notícia" : "Criar Nova Notícia"}</h2>
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