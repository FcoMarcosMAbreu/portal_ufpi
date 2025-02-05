import axios from "axios"
import type { AlunoResponseDto, CreateAlunoDto, UpdateAlunoDto } from "../types/aluno"
import { USE_MOCK_DATA } from "../components/config/appConfig"
import { mockAlunos } from "../components/mock/mockData"

const API_URL = "http://localhost:3000" // Adjust to your backend URL

export const alunoService = {
  getAll: async (): Promise<AlunoResponseDto[]> => {
    if (USE_MOCK_DATA) {
      return Promise.resolve(mockAlunos)
    }
    const response = await axios.get(`${API_URL}/alunos`)
    return response.data
  },

  getById: async (id: number): Promise<AlunoResponseDto> => {
    if (USE_MOCK_DATA) {
      const aluno = mockAlunos.find((a) => a.id === id)
      return aluno ? Promise.resolve(aluno) : Promise.reject(new Error("Aluno não encontrado"))
    }
    const response = await axios.get(`${API_URL}/alunos/${id}`)
    return response.data
  },

  create: async (aluno: CreateAlunoDto): Promise<AlunoResponseDto> => {
    if (USE_MOCK_DATA) {
      const newAluno = { ...aluno, id: mockAlunos.length + 1 }
      mockAlunos.push(newAluno)
      return Promise.resolve(newAluno)
    }
    const response = await axios.post(`${API_URL}/alunos`, aluno)
    return response.data
  },

  update: async (id: number, aluno: UpdateAlunoDto): Promise<AlunoResponseDto> => {
    if (USE_MOCK_DATA) {
      const index = mockAlunos.findIndex((a) => a.id === id)
      if (index !== -1) {
        mockAlunos[index] = { ...mockAlunos[index], ...aluno }
        return Promise.resolve(mockAlunos[index])
      }
      return Promise.reject(new Error("Aluno não encontrado"))
    }
    const response = await axios.put(`${API_URL}/alunos/${id}`, aluno)
    return response.data
  },

  delete: async (id: number): Promise<void> => {
    if (USE_MOCK_DATA) {
      const index = mockAlunos.findIndex((a) => a.id === id)
      if (index !== -1) {
        mockAlunos.splice(index, 1)
        return Promise.resolve()
      }
      return Promise.reject(new Error("Aluno não encontrado"))
    }
    await axios.delete(`${API_URL}/alunos/${id}`)
  },
}
