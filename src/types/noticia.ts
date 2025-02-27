export enum TagNoticia {
    Informativo = "Informativo",
    Evento = "Evento",
    // Add other tags as needed
  }
  
  export interface NoticiaDto {
    id: number
    titulo: string
    tag: TagNoticia
    conteudo: string
    links_referencia?: string
    arquivo?: string
    data_criacao: Date
  }
  
  export interface CreateNoticiaDto {
    titulo: string
    tag: TagNoticia
    conteudo: string
    links_referencia?: string
    arquivo?: File
    data_criacao: Date
  }
  
  export interface UpdateNoticiaDto {
    titulo?: string
    tag?: TagNoticia
    conteudo?: string
    links_referencia?: string
    arquivo?: File
    data_criacao?: Date
  }  