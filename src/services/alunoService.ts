import axios from "axios"
import type { AlunoResponseDto, CreateAlunoDto, UpdateAlunoDto } from "../types/aluno"

const API_URL = "http://localhost:3000"

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

export const alunoService = {
  getAll: async (): Promise<AlunoResponseDto[]> => {
    const response = await axiosInstance.get("/alunos")
    return response.data
  },

  getById: async (id: number): Promise<AlunoResponseDto> => {
    const response = await axiosInstance.get(`/alunos/${id}`)
    return response.data
  },

  create: async (aluno: CreateAlunoDto): Promise<AlunoResponseDto> => {
    const response = await axiosInstance.post("/alunos", aluno)
    return response.data
  },

  update: async (id: number, aluno: UpdateAlunoDto): Promise<AlunoResponseDto> => {
    const response = await axiosInstance.put(`/alunos/${id}`, aluno)
    return response.data
  },

  delete: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/alunos/${id}`)
  },
}