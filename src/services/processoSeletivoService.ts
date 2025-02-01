import axios from "axios"
import type {
    ProcessoSeletivoDto,
    CreateProcessoSeletivoDto,
    UpdateProcessoSeletivoDto,
  } from "../types/processoSeletivo"

const API_URL = "http://localhost:3000" // Adjust to your backend URL

export const processoSeletivoService = {
  getAll: async (): Promise<ProcessoSeletivoDto[]> => {
    const response = await axios.get(`${API_URL}/processos-seletivos`)
    return response.data
  },

  getById: async (id: number): Promise<ProcessoSeletivoDto> => {
    const response = await axios.get(`${API_URL}/processos-seletivos/${id}`)
    return response.data
  },

  create: async (processoSeletivo: CreateProcessoSeletivoDto): Promise<ProcessoSeletivoDto> => {
    const response = await axios.post(`${API_URL}/processos-seletivos`, processoSeletivo)
    return response.data
  },

  update: async (id: number, processoSeletivo: UpdateProcessoSeletivoDto): Promise<ProcessoSeletivoDto> => {
    const response = await axios.put(`${API_URL}/processos-seletivos/${id}`, processoSeletivo)
    return response.data
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/processos-seletivos/${id}`)
  },
}