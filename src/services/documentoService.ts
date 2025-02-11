import axios from "axios"
import type { DocumentoResponseDto, CreateDocumentoDto, UpdateDocumentoDto } from "../types/documento"

const API_URL = "http://localhost:3000" // Adjust to your backend URL

export const documentoService = {
  getAll: async (): Promise<DocumentoResponseDto[]> => {
    const response = await axios.get(`${API_URL}/documentos`)
    return response.data
  },

  getById: async (id: number): Promise<DocumentoResponseDto> => {
    const response = await axios.get(`${API_URL}/documentos/${id}`)
    return response.data
  },

  create: async (documento: CreateDocumentoDto): Promise<DocumentoResponseDto> => {
    const formData = new FormData()
    formData.append("nome", documento.nome)
    formData.append("tipo", documento.tipo)
    formData.append("tag", documento.tag)
    formData.append("arquivo", documento.arquivo)

    const response = await axios.post(`${API_URL}/documentos`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    return response.data
  },

  update: async (id: number, documento: UpdateDocumentoDto): Promise<DocumentoResponseDto> => {
    const formData = new FormData()
    if (documento.nome) formData.append("nome", documento.nome)
    if (documento.tipo) formData.append("tipo", documento.tipo)
    if (documento.tag) formData.append("tag", documento.tag)
    if (documento.arquivo) formData.append("arquivo", documento.arquivo)

    const response = await axios.put(`${API_URL}/documentos/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    return response.data
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/documentos/${id}`)
  },
}

