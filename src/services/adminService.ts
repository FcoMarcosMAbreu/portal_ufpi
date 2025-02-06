import axios from "axios"
import type { AdminResponseDto, CreateAdminDto, UpdateAdminDto } from "../types/admin"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api"

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Interceptor para adicionar o token de autenticação
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const adminService = {
  getAll: async (): Promise<AdminResponseDto[]> => {
    const response = await axiosInstance.get("/admins")
    return response.data
  },

  getById: async (id: number): Promise<AdminResponseDto> => {
    const response = await axiosInstance.get(`/admins/${id}`)
    return response.data
  },

  create: async (admin: CreateAdminDto): Promise<AdminResponseDto> => {
    const response = await axiosInstance.post("/admins", admin)
    return response.data
  },

  update: async (id: number, admin: UpdateAdminDto): Promise<AdminResponseDto> => {
    const response = await axiosInstance.put(`/admins/${id}`, admin)
    return response.data
  },

  delete: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/admins/${id}`)
  },
}