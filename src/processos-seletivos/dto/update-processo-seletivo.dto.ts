import { PartialType } from '@nestjs/mapped-types';
import { CreateProcessoSeletivoDto } from './create-processo-seletivo.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateProcessoSeletivoDto extends PartialType(CreateProcessoSeletivoDto) {
  @ApiProperty({ description: 'Título do processo seletivo', required: false })
  @IsOptional()
  @IsString()
  titulo?: string;

  @ApiProperty({ description: 'Descrição do processo seletivo', required: false })
  @IsOptional()
  @IsString()
  descricao?: string;

  @ApiProperty({ description: 'Link de inscrição para o processo seletivo', required: false, example: 'https://example.com' })
  @IsOptional()
  @IsUrl()
  link_inscricao?: string;
}
