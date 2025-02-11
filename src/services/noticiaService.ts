import axios from "axios"
import type { NoticiaDto, CreateNoticiaDto, UpdateNoticiaDto } from "../types/noticia"
import { authService } from "./authService"

const API_URL = "http://localhost:3000/noticias"

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

export const noticiaService = {
  getAll: async (): Promise<NoticiaDto[]> => {
    const response = await axiosInstance.get("")
    return response.data
  },

  getById: async (id: number): Promise<NoticiaDto> => {
    const response = await axiosInstance.get(`/${id}`)
    return response.data
  },

  create: async (noticia: CreateNoticiaDto): Promise<NoticiaDto> => {
    const response = await axiosInstance.post("", noticia)
    return response.data
  },

  update: async (id: number, noticia: UpdateNoticiaDto): Promise<NoticiaDto> => {
    const response = await axiosInstance.patch(`/${id}`, noticia)
    return response.data
  },

  delete: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/${id}`)
  },
}

