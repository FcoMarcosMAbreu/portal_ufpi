import { PartialType } from '@nestjs/mapped-types';
import { CreateCalendarioDto } from './create-calendario.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateCalendarioDto extends PartialType(CreateCalendarioDto) {
  @ApiProperty({ description: 'Título do evento', required: false })
  @IsOptional()
  @IsString()
  titulo?: string;

  @ApiProperty({ description: 'Descrição do evento', required: false })
  @IsOptional()
  @IsString()
  descricao?: string;

  @ApiProperty({ description: 'Data de início do evento', required: false, example: '2025-02-01' })
  @IsOptional()
  @IsDateString()
  data_inicio?: string;

  @ApiProperty({ description: 'Data de término do evento', required: false, example: '2025-02-10' })
  @IsOptional()
  @IsDateString()
  data_termino?: string;
}
