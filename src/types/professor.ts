export enum Nivel {
    GRADUACAO = "GRADUACAO",
    MESTRADO = "MESTRADO",
    DOUTORADO = "DOUTORADO",
  }
  
  export enum Vinculo {
    EFETIVO = "EFETIVO",
    SUBSTITUTO = "SUBSTITUTO",
    VISITANTE = "VISITANTE",
  }
  
  export interface ProfessorResponseDto {
    id: number
    nome: string
    matricula: string
    email: string
    nivel: Nivel
    telefone: string
    curriculo_lattes: string
    vinculo: Vinculo
    data_criacao: Date
  }
  
  export interface CreateProfessorDto {
    nome: string
    matricula: string
    email: string
    nivel: Nivel
    telefone: string
    curriculo_lattes: string
    vinculo: Vinculo
    data_criacao: Date
  }
  
  export interface UpdateProfessorDto {
    nome?: string
    matricula?: string
    email?: string
    nivel?: Nivel
    telefone?: string
    curriculo_lattes?: string
    vinculo?: Vinculo
    data_criacao?: Date
  }  