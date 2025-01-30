import { ApiProperty } from '@nestjs/swagger';

export class TurmaDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  materia: string;

  @ApiProperty()
  nome_turma: string;

  @ApiProperty()
  horarios: string;

  @ApiProperty()
  periodo_ano: string;

  @ApiProperty()
  docentes: string;

  @ApiProperty()
  data_criacao: Date;
}