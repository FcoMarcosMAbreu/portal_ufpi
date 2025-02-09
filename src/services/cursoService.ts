import axios from "axios"
import type { CursoResponseDto, CreateCursoDto, UpdateCursoDto } from "../types/curso"

const API_URL = "http://localhost:3000"

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

export const cursoService = {
  // Obtém todos os cursos do banco de dados
  getAll: async (): Promise<CursoResponseDto[]> => {
    const response = await axiosInstance.get("/cursos")
    return response.data
  },

  // Obtém um curso específico pelo ID
  getById: async (id: number): Promise<CursoResponseDto> => {
    const response = await axiosInstance.get(`/cursos/${id}`)
    return response.data
  },

  // Cria um novo curso no banco de dados
  create: async (curso: CreateCursoDto): Promise<CursoResponseDto> => {
    const response = await axiosInstance.post("/cursos", curso)
    return response.data
  },

  // Atualiza um curso existente no banco de dados
  update: async (id: number, curso: UpdateCursoDto): Promise<CursoResponseDto> => {
    const response = await axiosInstance.put(`/cursos/${id}`, curso)
    return response.data
  },

  // Remove um curso do banco de dados
  delete: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/cursos/${id}`)
  },
}