import axios from "axios"
import type { TurmaDto, CreateTurmaDto, UpdateTurmaDto } from "../types/turma"

const API_URL = "http://localhost:3000" // Adjust to your backend URL

export const turmaService = {
  getAll: async (): Promise<TurmaDto[]> => {
    const response = await axios.get(`${API_URL}/turmas`)
    return response.data
  },

  getById: async (id: number): Promise<TurmaDto> => {
    const response = await axios.get(`${API_URL}/turmas/${id}`)
    return response.data
  },

  create: async (turma: CreateTurmaDto): Promise<TurmaDto> => {
    const response = await axios.post(`${API_URL}/turmas`, turma)
    return response.data
  },

  update: async (id: number, turma: UpdateTurmaDto): Promise<TurmaDto> => {
    const response = await axios.put(`${API_URL}/turmas/${id}`, turma)
    return response.data
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/turmas/${id}`)
  },
}