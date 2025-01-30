import { ApiProperty } from '@nestjs/swagger';

export class CalendarioDto {
  @ApiProperty({ description: 'ID do evento' })
  id: number;

  @ApiProperty({ description: 'Título do evento' })
  titulo: string;

  @ApiProperty({ description: 'Descrição do evento' })
  descricao: string;

  @ApiProperty({ description: 'Data de início do evento', example: '2025-02-01' })
  data_inicio: string;

  @ApiProperty({ description: 'Data de término do evento', example: '2025-02-10' })
  data_termino: string;

  @ApiProperty({ description: 'Data de criação do registro', example: '2025-01-30T00:00:00.000Z' })
  data_criacao: Date;
}
