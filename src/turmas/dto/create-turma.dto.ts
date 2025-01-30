import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

enum PeriodoAno {
  PRIMEIRO = 'Primeiro',
  SEGUNDO = 'Segundo',
}

export class CreateTurmaDto {
  @ApiProperty({ description: 'Matéria da turma' })
  @IsString()
  @IsNotEmpty()
  materia: string;

  @ApiProperty({ description: 'Nome da turma' })
  @IsString()
  @IsNotEmpty()
  nome_turma: string;

  @ApiProperty({ description: 'Horários da turma' })
  @IsString()
  @IsNotEmpty()
  horarios: string;

  @ApiProperty({ description: 'Período/Ano da turma', enum: PeriodoAno })
  @IsEnum(PeriodoAno)
  periodo_ano: PeriodoAno;

  @ApiProperty({ description: 'Docentes responsáveis pela turma' })
  @IsString()
  @IsNotEmpty()
  docentes: string;
}