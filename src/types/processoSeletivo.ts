export interface ProcessoSeletivoDto {
    id: number
    titulo: string
    descricao: string
    link_inscricao: string
    data_criacao: Date
  }
  
  export interface CreateProcessoSeletivoDto {
    titulo: string
    descricao: string
    link_inscricao: string
  }
  
  export interface UpdateProcessoSeletivoDto {
    titulo?: string
    descricao?: string
    link_inscricao?: string
  }  