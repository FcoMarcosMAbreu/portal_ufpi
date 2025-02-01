import axios from "axios"
import type { CalendarioDto, CreateCalendarioDto, UpdateCalendarioDto } from "../types/calendario"

const API_URL = "http://localhost:3000" // Adjust to your backend URL

export const calendarioService = {
  getAll: async (): Promise<CalendarioDto[]> => {
    const response = await axios.get(`${API_URL}/calendario`)
    return response.data
  },

  getById: async (id: number): Promise<CalendarioDto> => {
    const response = await axios.get(`${API_URL}/calendario/${id}`)
    return response.data
  },

  create: async (calendario: CreateCalendarioDto): Promise<CalendarioDto> => {
    const response = await axios.post(`${API_URL}/calendario`, calendario)
    return response.data
  },

  update: async (id: number, calendario: UpdateCalendarioDto): Promise<CalendarioDto> => {
    const response = await axios.put(`${API_URL}/calendario/${id}`, calendario)
    return response.data
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/calendario/${id}`)
  },
}