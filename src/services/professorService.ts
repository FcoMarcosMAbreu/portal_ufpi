import axios from "axios"
import type { ProfessorResponseDto, CreateProfessorDto, UpdateProfessorDto } from "../types/professor"

const API_URL = "http://localhost:3000" // Adjust to your backend URL

export const professorService = {
  getAll: async (): Promise<ProfessorResponseDto[]> => {
    const response = await axios.get(`${API_URL}/professores`)
    return response.data
  },

  getById: async (id: number): Promise<ProfessorResponseDto> => {
    const response = await axios.get(`${API_URL}/professores/${id}`)
    return response.data
  },

  create: async (professor: CreateProfessorDto): Promise<ProfessorResponseDto> => {
    const response = await axios.post(`${API_URL}/professores`, professor)
    return response.data
  },

  update: async (id: number, professor: UpdateProfessorDto): Promise<ProfessorResponseDto> => {
    const response = await axios.put(`${API_URL}/professores/${id}`, professor)
    return response.data
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/professores/${id}`)
  },
}