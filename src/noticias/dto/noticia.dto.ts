// src/noticias/dto/noticia.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { TagNoticia } from '../tag.enum';

export class NoticiaDto {
  @ApiProperty({ description: 'ID da notícia', example: 1 })
  id: number;

  @ApiProperty({ description: 'Título da notícia', example: 'Nova atualização do sistema' })
  titulo: string;

  @ApiProperty({ description: 'Tag da notícia', example: 'Informativo', enum: TagNoticia })
  tag: TagNoticia;

  @ApiProperty({ description: 'Conteúdo da notícia', example: 'Aqui está o conteúdo da notícia...', type: String })
  conteudo: string;

  @ApiProperty({ description: 'Links de referência', example: 'https://linkreferencia.com', type: String })
  links_referencia: string;

  @ApiProperty({ description: 'Documento anexo', type: 'string', format: 'binary', required: false })
  documento_anexo?: Buffer;

  @ApiProperty({ description: 'Data de criação', example: '2025-01-30T12:00:00.000Z' })
  data_criacao: Date;
}