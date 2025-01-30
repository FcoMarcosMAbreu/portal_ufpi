// src/noticias/dto/create-noticia.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { TagNoticia } from '../tag.enum';
import { IsOptional, IsString } from 'class-validator';

export class CreateNoticiaDto {
  @ApiProperty({ description: 'Título da notícia', example: 'Nova atualização do sistema' })
  @IsString()
  titulo: string;

  @ApiProperty({ description: 'Tag da notícia', example: 'Informativo', enum: TagNoticia })
  @IsString()
  tag: TagNoticia;

  @ApiProperty({ description: 'Conteúdo da notícia', example: 'Aqui está o conteúdo da notícia...', type: String })
  @IsString()
  conteudo: string;

  @ApiProperty({ description: 'Links de referência', example: 'https://linkreferencia.com', type: String })
  @IsString()
  links_referencia: string;

  @ApiProperty({ description: 'Documento anexo', type: 'string', format: 'binary', required: false })
  @IsOptional()
  arquivo?: Buffer;

  @ApiProperty({ description: 'Data de criação', example: '2025-01-30T12:00:00.000Z' })
  data_criacao: Date;
}