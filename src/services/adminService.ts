import axios from "axios"
import type { AdminResponseDto, CreateAdminDto, UpdateAdminDto } from "../types/admin"
import { authService } from "./authService"

const API_URL = "http://localhost:3000/admins"

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
  }
  return config
})

export const adminService = {
  // Obtém todos os administradores do banco de dados
  getAll: async (): Promise<AdminResponseDto[]> => {
    const response = await axiosInstance.get("")
    return response.data
  },

  // Obtém um administrador específico pelo ID
  getById: async (id: number): Promise<AdminResponseDto> => {
    const response = await axiosInstance.get(`/${id}`)
    return response.data
  },

  // Cria um novo administrador no banco de dados
  create: async (admin: CreateAdminDto): Promise<AdminResponseDto> => {
    const response = await axiosInstance.post("", admin)
    return response.data
  },

  // Atualiza um administrador existente no banco de dados
  update: async (id: number, admin: UpdateAdminDto): Promise<AdminResponseDto> => {
    const response = await axiosInstance.put(`/${id}`, admin)
    return response.data
  },

  // Remove um administrador do banco de dados
  delete: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/${id}`)
  },
}

