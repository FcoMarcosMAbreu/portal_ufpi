// src/noticias/dto/update-noticia.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { TagNoticia } from '../tag.enum';

export class UpdateNoticiaDto {
  @ApiProperty({ description: 'Título da notícia', example: 'Atualização do sistema', required: false })
  titulo?: string;

  @ApiProperty({ description: 'Tag da notícia', example: 'Evento', enum: TagNoticia, required: false })
  tag?: TagNoticia;

  @ApiProperty({ description: 'Conteúdo da notícia', example: 'Conteúdo atualizado...', required: false })
  conteudo?: string;

  @ApiProperty({ description: 'Links de referência', example: 'https://linkreferencia.com', required: false })
  links_referencia?: string;

  @ApiProperty({ description: 'Documento anexo', type: 'string', required: false })
  arquivo?: string;

  @ApiProperty({ description: 'Data de criação', example: '2025-01-30T12:00:00.000Z', required: false })
  data_criacao?: Date;
}