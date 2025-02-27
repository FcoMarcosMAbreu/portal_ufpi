import axios from "axios"
import type { CalendarioDto, CreateCalendarioDto, UpdateCalendarioDto } from "../types/calendario"
import { authService } from "./authService"

//const API_URL = "http://localhost:3000"
const API_URL = import.meta.env.VITE_API_URL

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

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

export const calendarioService = {
  // Obtém todos os eventos do calendário do banco de dados
  getAll: async (): Promise<CalendarioDto[]> => {
    const response = await axiosInstance.get("/calendario")
    return response.data
  },

  // Obtém um evento específico do calendário pelo ID
  getById: async (id: number): Promise<CalendarioDto> => {
    const response = await axiosInstance.get(`/calendario/${id}`)
    return response.data
  },

  // Cria um novo evento no calendário no banco de dados
  create: async (calendario: CreateCalendarioDto): Promise<CalendarioDto> => {
    const response = await axiosInstance.post("/calendario", calendario)
    return response.data
  },

  // Atualiza um evento existente no calendário no banco de dados
  update: async (id: number, calendario: UpdateCalendarioDto): Promise<CalendarioDto> => {
    const response = await axiosInstance.patch(`/calendario/${id}`, calendario)
    return response.data
  },

  // Remove um evento do calendário do banco de dados
  delete: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/calendario/${id}`)
  },
}