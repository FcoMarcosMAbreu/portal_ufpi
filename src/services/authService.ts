// Usuário mockado
const mockUser = {
  id: 1,
  name: "Admin",
  email: "admin@example.com",
  role: "admin",
}

// Credenciais mockadas
const mockCredentials = {
  email: "admin@example.com",
  password: "password123",
}

export const authService = {
  login: (email: string, password: string): Promise<{ user: typeof mockUser; token: string }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === mockCredentials.email && password === mockCredentials.password) {
          const token = "mock-jwt-token"
          localStorage.setItem("token", token)
          localStorage.setItem("user", JSON.stringify(mockUser))
          resolve({ user: mockUser, token })
        } else {
          reject(new Error("Invalid credentials"))
        }
      }, 500) // Simula um delay de rede
    })
  },

  logout: (): void => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  },

  getCurrentUser: (): typeof mockUser | null => {
    const userStr = localStorage.getItem("user")
    if (userStr) {
      return JSON.parse(userStr)
    }
    return null
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("token")
  },
}