import axios from "axios"
import type { CreateAdminDto, LoginAdminDto } from "../types/auth"

const API_URL = "http://localhost:3000" // Adjust to your backend URL

export const authService = {
  register: async (admin: CreateAdminDto): Promise<void> => {
    await axios.post(`${API_URL}/auth/register`, admin)
  },

  login: async (credentials: LoginAdminDto): Promise<string> => {
    const response = await axios.post(`${API_URL}/auth/login`, credentials)
    return response.data.access_token
  },

  getCurrentUser: async (): Promise<any> => {
    const token = localStorage.getItem("token")
    if (!token) {
      throw new Error("No token found")
    }
    const response = await axios.get(`${API_URL}/auth`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data
  },

  setToken: (token: string): void => {
    localStorage.setItem("token", token)
  },

  getToken: (): string | null => {
    return localStorage.getItem("token")
  },

  removeToken: (): void => {
    localStorage.removeItem("token")
  },
}