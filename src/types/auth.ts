export interface CreateAdminDto {
  nome: string
  email: string
  senha: string
  cargo: string
  departamento: string
}

export interface LoginAdminDto {
  email: string
  senha: string // Alterado de 'password' para 'senha' para manter consistência com o backend
}

export interface JwtPayload {
  id: number
  email: string
  cargo: string
}

