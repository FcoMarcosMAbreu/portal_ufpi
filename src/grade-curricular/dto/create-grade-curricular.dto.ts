import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateGradeCurricularDto {
  @ApiProperty({ description: 'Título da grade curricular', example: 'Grade de Computação' })
  titulo: string;

  @ApiProperty({ description: 'Código da grade curricular', example: 'CC123' })
  codigo: string;

  @ApiProperty({ description: 'Componente curricular', example: 'Programação Web' })
  componente_curricular: string;

  @ApiProperty({ description: 'Ementa do componente curricular (opcional)', format: 'binary', required: false })
  @IsOptional()
  ementa?: Express.Multer.File;

  @ApiProperty({ description: 'Carga horária do componente curricular', example: '60h' })
  carga_horaria: string;

  @ApiProperty({ description: 'Data de criação', example: '2025-01-30T00:00:00' })
  data_criacao: Date;
}