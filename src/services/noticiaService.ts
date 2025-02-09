import axios from "axios"
import type { NoticiaDto, CreateNoticiaDto, UpdateNoticiaDto } from "../types/noticia"

const API_URL = "http://localhost:3000"

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

export const noticiaService = {
  // Obtém todas as notícias do banco de dados
  getAll: async (): Promise<NoticiaDto[]> => {
    const response = await axiosInstance.get("/noticias")
    return response.data
  },

  // Obtém uma notícia específica pelo ID
  getById: async (id: number): Promise<NoticiaDto> => {
    const response = await axiosInstance.get(`/noticias/${id}`)
    return response.data
  },

  // Cria uma nova notícia no banco de dados
  create: async (noticia: CreateNoticiaDto): Promise<NoticiaDto> => {
    const response = await axiosInstance.post("/noticias", noticia)
    return response.data
  },

  // Atualiza uma notícia existente no banco de dados
  update: async (id: number, noticia: UpdateNoticiaDto): Promise<NoticiaDto> => {
    const response = await axiosInstance.put(`/noticias/${id}`, noticia)
    return response.data
  },

  // Remove uma notícia do banco de dados
  delete: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/noticias/${id}`)
  },
}