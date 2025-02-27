import axios from "axios"
import type { ProfessorResponseDto, CreateProfessorDto, UpdateProfessorDto } from "../types/professor"
import { authService } from "./authService"

//const API_URL = "http://localhost:3000"
const API_URL = import.meta.env.VITE_API_URL

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

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


export const professorService = {
  // Obtém todos os professores do banco de dados
  getAll: async (): Promise<ProfessorResponseDto[]> => {
    const response = await axiosInstance.get("/professores")
    return response.data
  },

  // Obtém um professor específico pelo ID
  getById: async (id: number): Promise<ProfessorResponseDto> => {
    const response = await axiosInstance.get(`/professores/${id}`)
    return response.data
  },

  // Cria um novo professor no banco de dados
  create: async (professor: CreateProfessorDto): Promise<ProfessorResponseDto> => {
    const response = await axiosInstance.post("/professores", professor)
    return response.data
  },

  // Atualiza um professor existente no banco de dados
  update: async (id: number, professor: UpdateProfessorDto): Promise<ProfessorResponseDto> => {
    const response = await axiosInstance.put(`/professores/${id}`, professor)
    return response.data
  },

  // Remove um professor do banco de dados
  delete: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/professores/${id}`)
  },
}

