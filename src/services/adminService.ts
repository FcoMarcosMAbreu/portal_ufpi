import axios from "axios"
import type { AdminResponseDto, CreateAdminDto, UpdateAdminDto } from "../types/admin"

const API_URL = "http://localhost:3000" // Ajuste para a URL correta do seu backend

export const adminService = {
  getAll: async (): Promise<AdminResponseDto[]> => {
    const response = await axios.get(`${API_URL}/admins`)
    return response.data
  },

  getById: async (id: number): Promise<AdminResponseDto> => {
    const response = await axios.get(`${API_URL}/admins/${id}`)
    return response.data
  },

  create: async (admin: CreateAdminDto): Promise<AdminResponseDto> => {
    const response = await axios.post(`${API_URL}/admins`, admin)
    return response.data
  },

  update: async (id: number, admin: UpdateAdminDto): Promise<AdminResponseDto> => {
    const response = await axios.put(`${API_URL}/admins/${id}`, admin)
    return response.data
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/admins/${id}`)
  },
}