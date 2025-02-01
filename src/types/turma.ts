export enum PeriodoAno {
    PRIMEIRO = "Primeiro",
    SEGUNDO = "Segundo",
  }
  
  export interface TurmaDto {
    id: number
    materia: string
    nome_turma: string
    horarios: string
    periodo_ano: PeriodoAno
    docentes: string
    data_criacao: Date
  }
  
  export interface CreateTurmaDto {
    materia: string
    nome_turma: string
    horarios: string
    periodo_ano: PeriodoAno
    docentes: string
  }
  
  export interface UpdateTurmaDto {
    materia?: string
    nome_turma?: string
    horarios?: string
    periodo_ano?: PeriodoAno
    docentes?: string
  }  