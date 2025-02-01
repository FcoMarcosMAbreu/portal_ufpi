export enum TipoDocumento {
    PDF = "PDF",
    DOCX = "DOCX",
    XLS = "XLS",
    JPG = "JPG",
    PNG = "PNG",
  }
  
  export interface DocumentoResponseDto {
    id: number
    nome: string
    tipo: TipoDocumento
    data_criacao: Date
  }
  
  export interface CreateDocumentoDto {
    nome: string
    tipo: TipoDocumento
    arquivo: File
  }
  
  export interface UpdateDocumentoDto {
    nome?: string
    tipo?: TipoDocumento
    arquivo?: File
  }  