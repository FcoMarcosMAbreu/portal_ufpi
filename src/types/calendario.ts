export interface CalendarioDto {
    id: number
    titulo: string
    descricao: string
    data_inicio: string
    data_termino: string
    data_criacao: Date
  }
  
  export interface CreateCalendarioDto {
    titulo: string
    descricao: string
    data_inicio: string
    data_termino: string
  }
  
  export interface UpdateCalendarioDto {
    titulo?: string
    descricao?: string
    data_inicio?: string
    data_termino?: string
  }
  
  