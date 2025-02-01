export interface CreateAdminDto {
    nome: string
    email: string
    senha: string
    cargo: string
    departamento: string
  }
  
  export interface LoginAdminDto {
    email: string
    senha: string
  }
  
  export interface JwtPayload {
    id: number
    email: string
    cargo: string
  }  