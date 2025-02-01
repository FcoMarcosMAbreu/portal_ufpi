import axios from "axios"
import type { AlunoResponseDto, CreateAlunoDto, UpdateAlunoDto } from "../types/aluno"

const API_URL = "http://localhost:3000" // Ajuste para a URL correta do seu backend

export const alunoService = {
  getAll: async (): Promise<AlunoResponseDto[]> => {
    const response = await axios.get(`${API_URL}/alunos`)
    return response.data
  },

  getById: async (id: number): Promise<AlunoResponseDto> => {
    const response = await axios.get(`${API_URL}/alunos/${id}`)
    return response.data
  },

  create: async (aluno: CreateAlunoDto): Promise<AlunoResponseDto> => {
    const response = await axios.post(`${API_URL}/alunos`, aluno)
    return response.data
  },

  update: async (id: number, aluno: UpdateAlunoDto): Promise<AlunoResponseDto> => {
    const response = await axios.put(`${API_URL}/alunos/${id}`, aluno)
    return response.data
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/alunos/${id}`)
  },
}