import axios from "axios"
import type { AlunoResponseDto, CreateAlunoDto, UpdateAlunoDto } from "../types/aluno"
import { authService } from "./authService"

const API_URL = "http://localhost:3000/alunos"

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = authService.getAccessToken()
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export const alunoService = {
  getAll: async (): Promise<AlunoResponseDto[]> => {
    const response = await axiosInstance.get("")
    return response.data
  },

  getById: async (id: number): Promise<AlunoResponseDto> => {
    const response = await axiosInstance.get(`/${id}`)
    return response.data
  },

  create: async (aluno: CreateAlunoDto): Promise<AlunoResponseDto> => {
    const response = await axiosInstance.post("", aluno)
    return response.data
  },

  update: async (id: number, aluno: UpdateAlunoDto): Promise<AlunoResponseDto> => {
    const response = await axiosInstance.put(`/${id}`, aluno)
    return response.data
  },

  delete: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/${id}`)
  },
}

