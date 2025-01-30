import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateCalendarioDto {
  @ApiProperty({ description: 'Título do evento no calendário' })
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @ApiProperty({ description: 'Descrição do evento no calendário' })
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @ApiProperty({ description: 'Data de início do evento', example: '2025-02-01' })
  @IsDateString()
  @IsNotEmpty()
  data_inicio: string;

  @ApiProperty({ description: 'Data de término do evento', example: '2025-02-10' })
  @IsDateString()
  @IsNotEmpty()
  data_termino: string;
}
