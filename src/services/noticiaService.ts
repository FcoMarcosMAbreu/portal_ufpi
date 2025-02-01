import axios from "axios"
import type { NoticiaDto, CreateNoticiaDto, UpdateNoticiaDto } from "../types/noticia"

const API_URL = "http://localhost:3000" // Adjust to your backend URL

export const noticiaService = {
  getAll: async (): Promise<NoticiaDto[]> => {
    const response = await axios.get(`${API_URL}/noticias`)
    return response.data
  },

  getById: async (id: number): Promise<NoticiaDto> => {
    const response = await axios.get(`${API_URL}/noticias/${id}`)
    return response.data
  },

  create: async (noticia: CreateNoticiaDto): Promise<NoticiaDto> => {
    const formData = new FormData()
    Object.entries(noticia).forEach(([key, value]) => {
      if (key === "arquivo" && value instanceof File) {
        formData.append(key, value)
      } else {
        formData.append(key, String(value))
      }
    })
    const response = await axios.post(`${API_URL}/noticias`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    return response.data
  },

  update: async (id: number, noticia: UpdateNoticiaDto): Promise<NoticiaDto> => {
    const formData = new FormData()
    Object.entries(noticia).forEach(([key, value]) => {
      if (key === "arquivo" && value instanceof File) {
        formData.append(key, value)
      } else if (value !== undefined) {
        formData.append(key, String(value))
      }
    })
    const response = await axios.put(`${API_URL}/noticias/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    return response.data
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/noticias/${id}`)
  },
}