import axios from "axios"
import type { CursoResponseDto, CreateCursoDto, UpdateCursoDto } from "../types/curso"

const API_URL = "http://localhost:3000" // Adjust to your backend URL

export const cursoService = {
  getAll: async (): Promise<CursoResponseDto[]> => {
    const response = await axios.get(`${API_URL}/cursos`)
    return response.data
  },

  getById: async (id: number): Promise<CursoResponseDto> => {
    const response = await axios.get(`${API_URL}/cursos/${id}`)
    return response.data
  },

  create: async (curso: CreateCursoDto): Promise<CursoResponseDto> => {
    const response = await axios.post(`${API_URL}/cursos`, curso)
    return response.data
  },

  update: async (id: number, curso: UpdateCursoDto): Promise<CursoResponseDto> => {
    const response = await axios.put(`${API_URL}/cursos/${id}`, curso)
    return response.data
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/cursos/${id}`)
  },
}