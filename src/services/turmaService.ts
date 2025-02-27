import axios from "axios"
import type { TurmaDto, CreateTurmaDto, UpdateTurmaDto } from "../types/turma"
import { authService } from "./authService"

//const API_URL = "http://localhost:3000/turmas"
const API_URL = import.meta.env.VITE_API_URL + "/turmas"

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Adiciona o token de autenticação a todas as requisições
axiosInstance.interceptors.request.use((config) => {
  const token = authService.getAccessToken()
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`
    console.log("Token adicionado à requisição:", token)
  } else {
    console.log("Token não encontrado")
  }
  return config
})

export const turmaService = {
  getAll: async (): Promise<TurmaDto[]> => {
    const response = await axiosInstance.get("")
    return response.data
  },

  getById: async (id: number): Promise<TurmaDto> => {
    const response = await axiosInstance.get(`/${id}`)
    return response.data
  },

  create: async (turma: CreateTurmaDto): Promise<TurmaDto> => {
    const response = await axiosInstance.post("", turma)
    return response.data
  },

  update: async (id: number, turma: UpdateTurmaDto): Promise<TurmaDto> => {
    const response = await axiosInstance.put(`/${id}`, turma)
    return response.data
  },

  delete: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/${id}`)
  },
}

