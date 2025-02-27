import axios from "axios"
import type { DocumentoResponseDto, CreateDocumentoDto, UpdateDocumentoDto } from "../types/documento"
import { authService } from "./authService"

//const API_URL = "http://localhost:3000/documentos"
const API_URL = import.meta.env.VITE_API_URL + "/documentos"

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "multipart/form-data",
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

export const documentoService = {
  getAll: async (): Promise<DocumentoResponseDto[]> => {
    const response = await axiosInstance.get("")
    return response.data
  },

  getById: async (id: number): Promise<DocumentoResponseDto> => {
    const response = await axiosInstance.get(`/${id}`)
    return response.data
  },

  create: async (documento: CreateDocumentoDto): Promise<DocumentoResponseDto> => {
    const formData = new FormData()
    formData.append("nome", documento.nome)
    formData.append("tipo", documento.tipo)
    formData.append("tag", documento.tag)
    formData.append("arquivo", documento.arquivo)

    const response = await axiosInstance.post("", formData)
    return response.data
  },

  update: async (id: number, documento: UpdateDocumentoDto): Promise<DocumentoResponseDto> => {
    const formData = new FormData()
    if (documento.nome) formData.append("nome", documento.nome)
    if (documento.tipo) formData.append("tipo", documento.tipo)
    if (documento.tag) formData.append("tag", documento.tag)
    if (documento.arquivo) formData.append("arquivo", documento.arquivo)

    const response = await axiosInstance.patch(`/${id}`, formData)
    return response.data
  },

  delete: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/${id}`)
  },
}

