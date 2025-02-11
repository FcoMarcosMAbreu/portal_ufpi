export enum TipoDocumento {
  PDF = "PDF",
  DOCX = "DOCX",
  XLS = "XLS",
  JPG = "JPG",
  PNG = "PNG",
}

export enum TagDocumento {
  FORMULARIO = "FORMULARIO",
  RESOLUCAO = "RESOLUCAO",
  REGIMENTO = "REGIMENTO",
  MATERIAL_DIDATICO = "MATERIAL_DIDATICO",
  OUTROS = "OUTROS",
}

export interface DocumentoResponseDto {
  id: number
  nome: string
  tipo: TipoDocumento
  tag: TagDocumento
  caminho_arquivo: string
  data_criacao: Date
}

export interface CreateDocumentoDto {
  nome: string
  tipo: TipoDocumento
  tag: TagDocumento
  arquivo: File
}

export interface UpdateDocumentoDto {
  nome?: string
  tipo?: TipoDocumento
  tag?: TagDocumento
  arquivo?: File
}

