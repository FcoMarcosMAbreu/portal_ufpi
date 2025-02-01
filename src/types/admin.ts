export interface AdminResponseDto {
    id: number
    nome: string
    email: string
    cargo: string
    departamento: string
    data_criacao: Date
  }
  
  export interface CreateAdminDto {
    nome: string
    email: string
    senha: string
    cargo?: string
    departamento?: string
  }
  
  export interface UpdateAdminDto {
    nome?: string
    email?: string
    senha?: string
    cargo?: string
    departamento?: string
  }  