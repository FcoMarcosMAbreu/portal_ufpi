export interface GradeCurricularDto {
    id: number
    titulo: string
    codigo: string
    tipo_pos: string
    componente_curricular: string
    ementa: any
    carga_horaria: string
    data_criacao: Date
  }
  
  export interface CreateGradeCurricularDto {
    titulo: string
    codigo: string
    tipo_pos: string
    componente_curricular: string
    ementa?: File
    carga_horaria: string
    data_criacao: Date
  }
  
  export interface UpdateGradeCurricularDto {
    titulo?: string
    codigo?: string
    tipo_pos?: string
    componente_curricular?: string
    ementa?: File
    carga_horaria?: string
    data_criacao?: Date
  }  