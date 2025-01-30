import { PartialType } from '@nestjs/mapped-types';
import { CreateTurmaDto } from './create-turma.dto';
import { ApiProperty } from '@nestjs/swagger';

enum PeriodoAno {
    PRIMEIRO = 'Primeiro',
    SEGUNDO = 'Segundo',
}

export class UpdateTurmaDto extends PartialType(CreateTurmaDto) {
  @ApiProperty({ description: 'Matéria da turma', required: false })
  materia?: string;

  @ApiProperty({ description: 'Nome da turma', required: false })
  nome_turma?: string;

  @ApiProperty({ description: 'Horários da turma', required: false })
  horarios?: string;

  @ApiProperty({ description: 'Período/Ano da turma', enum: ['Primeiro', 'Segundo'], required: false })
  periodo_ano?: PeriodoAno;

  @ApiProperty({ description: 'Docentes responsáveis pela turma', required: false })
  docentes?: string;
}
