export enum Nivel {
    GRADUACAO = "GRADUACAO",
    MESTRADO = "MESTRADO",
    DOUTORADO = "DOUTORADO",
    PHD  = "PHD",
  }
  
  export enum Vinculo {
    TEMPORARIO = 'TEMPORARIO',
    EFETIVO = 'EFETIVO',
    COLABORADOR = 'COLABORADOR',
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