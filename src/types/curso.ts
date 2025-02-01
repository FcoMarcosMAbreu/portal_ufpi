export interface CursoResponseDto {
    id: number
    nome: string
    link_documento_capes: string
    link_detalhes_curso: string
    data_criacao: Date
  }
  
  export interface CreateCursoDto {
    nome: string
    link_documento_capes: string
    link_detalhes_curso: string
    data_criacao: Date
  }
  
  export interface UpdateCursoDto {
    nome?: string
    link_documento_capes?: string
    link_detalhes_curso?: string
    data_criacao?: Date
  }  