import axios from "axios"
import type {
  ProcessoSeletivoDto,
  CreateProcessoSeletivoDto,
  UpdateProcessoSeletivoDto,
} from "../types/processoSeletivo"
import { authService } from "./authService"

//const API_URL = "http://localhost:3000" // Adjust to your backend URL
const API_URL = import.meta.env.VITE_API_URL

const axiosInstance = axios.create({
  baseURL: `${API_URL}/processos-seletivos`,
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

export const processoSeletivoService = {
  getAll: async (): Promise<ProcessoSeletivoDto[]> => {
    const response = await axiosInstance.get(``)
    return response.data
  },

  getById: async (id: number): Promise<ProcessoSeletivoDto> => {
    const response = await axiosInstance.get(`/${id}`)
    return response.data
  },

  create: async (processoSeletivo: CreateProcessoSeletivoDto): Promise<ProcessoSeletivoDto> => {
    const response = await axiosInstance.post(``, processoSeletivo)
    return response.data
  },

  update: async (id: number, processoSeletivo: UpdateProcessoSeletivoDto): Promise<ProcessoSeletivoDto> => {
    const response = await axiosInstance.patch(`/${id}`, processoSeletivo)
    return response.data
  },

  delete: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/${id}`)
  },
}

