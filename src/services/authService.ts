import axios from "axios"
import type { CreateAdminDto, LoginAdminDto, JwtPayload } from "../types/auth"

const API_URL = "http://localhost:3000/auth"

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

export const authService = {
  // Registra um novo administrador
  register: async (admin: CreateAdminDto): Promise<void> => {
    await axiosInstance.post("/register", admin)
  },

  // Realiza o login do administrador
  login: async (credentials: LoginAdminDto): Promise<string> => {
    const response = await axios.post(`${API_URL}/login`, credentials)
    const { access_token } = response.data
    localStorage.setItem("access_token", access_token)
    localStorage.setItem("token_expiration", (Date.now() + 30 * 60 * 1000).toString())
    return access_token
  },

  // Realiza o logout do administrador
  logout: (): void => {
    authService.removeToken()
  },

  // Verifica se o usuário está autenticado
  isAuthenticated: (): boolean => {
    const token = localStorage.getItem("access_token")
    return !!token && !authService.isTokenExpired()
  },

  // Obtém o token de acesso
  getAccessToken: (): string | null => {
    return localStorage.getItem("access_token")
  },

  // Decodifica o payload do JWT
  decodeToken: (token: string): JwtPayload => {
    const base64Url = token.split(".")[1]
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    )
    return JSON.parse(jsonPayload)
  },

  // Obtém o usuário atual
  getCurrentUser: (): JwtPayload | null => {
    const token = authService.getAccessToken()
    return token ? authService.decodeToken(token) : null
  },

  isTokenExpired: (): boolean => {
    const expirationTime = localStorage.getItem("token_expiration")
    if (!expirationTime) return true
    return Date.now() > Number.parseInt(expirationTime, 10)
  },

  removeToken: (): void => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("token_expiration")
  },
}

