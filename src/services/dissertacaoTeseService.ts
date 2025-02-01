import axios from "axios"
import type { DissertacaoTeseDto, CreateDissertacaoTeseDto, UpdateDissertacaoTeseDto } from "../types/dissertacaoTese"

const API_URL = "http://localhost:3000" // Adjust to your backend URL

export const dissertacaoTeseService = {
  getAll: async (): Promise<DissertacaoTeseDto[]> => {
    const response = await axios.get(`${API_URL}/dissertacoes-teses`)
    return response.data
  },

  getById: async (id: number): Promise<DissertacaoTeseDto> => {
    const response = await axios.get(`${API_URL}/dissertacoes-teses/${id}`)
    return response.data
  },

  create: async (dissertacaoTese: CreateDissertacaoTeseDto): Promise<DissertacaoTeseDto> => {
    const response = await axios.post(`${API_URL}/dissertacoes-teses`, dissertacaoTese)
    return response.data
  },

  update: async (id: number, dissertacaoTese: UpdateDissertacaoTeseDto): Promise<DissertacaoTeseDto> => {
    const response = await axios.put(`${API_URL}/dissertacoes-teses/${id}`, dissertacaoTese)
    return response.data
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/dissertacoes-teses/${id}`)
  },
}