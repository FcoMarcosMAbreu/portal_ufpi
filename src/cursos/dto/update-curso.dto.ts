import { PartialType } from '@nestjs/mapped-types';
import { CreateCursoDto } from './create-curso.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCursoDto extends PartialType(CreateCursoDto) {
  @ApiProperty({ description: 'Nome do curso', example: 'Engenharia de Software' })
  nome?: string;

  @ApiProperty({ description: 'Link do documento da CAPES', example: 'https://capes.gov.br/documento.pdf' })
  link_documento_capes?: string;

  @ApiProperty({ description: 'Link com detalhes do curso', example: 'https://ufpi.br/engenharia-de-software' })
  link_detalhes_curso?: string;

  @ApiProperty({ description: 'Data de criação do curso', example: '2025-01-29T12:00:00.000Z' })
  data_criacao?: Date;
}