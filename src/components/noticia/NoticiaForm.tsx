"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { noticiaService } from "../../services/noticiaService"
import { type CreateNoticiaDto, type UpdateNoticiaDto, TagNoticia } from "../../types/noticia"
import "./NoticiaForm.css"

interface NoticiaFormProps {
  isEditing: boolean
  onSubmitSuccess: () => void
  onClose: () => void
}

const NoticiaForm: React.FC<NoticiaFormProps> = ({ isEditing, onSubmitSuccess, onClose }) => {
  const { id } = useParams<{ id: string }>()
  const [formData, setFormData] = useState<CreateNoticiaDto | UpdateNoticiaDto>({
    titulo: "",
    tag: TagNoticia.Informativo,
    conteudo: "",
    links_referencia: "",
    data_criacao: new Date(),
  })

  useEffect(() => {
    if (isEditing && id) {
      fetchNoticia(Number.parseInt(id))
    }
  }, [isEditing, id])

  const fetchNoticia = async (noticiaId: number) => {
    try {
      const noticia = await noticiaService.getById(noticiaId)
      setFormData({
        titulo: noticia.titulo,
        tag: noticia.tag,
        conteudo: noticia.conteudo,
        links_referencia: noticia.links_referencia,
        data_criacao: new Date(noticia.data_criacao),
      })
    } catch (error) {
      console.error("Erro ao buscar notícia:", error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
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

      if (isEditing && id) {
        await noticiaService.update(Number.parseInt(id), formDataToSend)
      } else {
        await noticiaService.create(formDataToSend)
      }
      onSubmitSuccess()
      onClose()
    } catch (error) {
      console.error("Erro ao salvar notícia:", error)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const formDataToSend = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined) {
          formDataToSend.append(key, String(value))
        }
      })
      formDataToSend.append("arquivo", e.target.files[0])
    }
  }

  return (
    <div className="noticia-form">
      <h2>{isEditing ? "Editar Notícia" : "Criar Notícia"}</h2>
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
            required
          />
        </div>
        <div>
          <label htmlFor="arquivo">Arquivo:</label>
          <input type="file" id="arquivo" name="arquivo" onChange={handleFileChange} />
        </div>
        <button type="submit">{isEditing ? "Atualizar" : "Criar"}</button>
      </form>
    </div>
  )
}

export default NoticiaForm

