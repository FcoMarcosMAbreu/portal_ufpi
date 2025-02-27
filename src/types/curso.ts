export enum tipoEnumCurso{
  Doutorado = 'Doutorado',
  Mestrado = 'Mestrado',
}

export interface CursoResponseDto {
    id: number
    nome: string
    tipo_pos: tipoEnumCurso
    link_documento_capes: string
    link_detalhes_curso: string
    data_criacao: Date
  }
  
  export interface CreateCursoDto {
    nome: string
    tipo_pos: tipoEnumCurso
    link_documento_capes: string
    link_detalhes_curso: string
    data_criacao: Date
  }
  
  export interface UpdateCursoDto {
    nome?: string
    tipo_pos?: tipoEnumCurso
    link_documento_capes?: string
    link_detalhes_curso?: string
    data_criacao?: Date
  }  