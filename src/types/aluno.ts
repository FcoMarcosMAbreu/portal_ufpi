export interface AlunoResponseDto {
    id: number
    nome: string
    email: string
    matricula: string
    curso: string
  }
  
  export interface CreateAlunoDto {
    nome: string
    email: string
    matricula: string
    curso: string
  }
  
  export interface UpdateAlunoDto {
    nome?: string
    email?: string
    matricula?: string
    curso?: string
  }  