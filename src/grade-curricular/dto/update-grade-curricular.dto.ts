import { ApiProperty } from '@nestjs/swagger';

export class UpdateGradeCurricularDto {
  @ApiProperty({ description: 'Título da grade curricular', example: 'Grade de Computação', required: false })
  titulo?: string;

  @ApiProperty({ description: 'Código da grade curricular', example: 'CC123', required: false })
  codigo?: string;

  @ApiProperty({ description: 'Componente curricular', example: 'Programação Web', required: false })
  componente_curricular?: string;

  @ApiProperty({ description: 'Ementa do componente curricular (opcional)', format: 'binary', required: false })
  ementa?: any;

  @ApiProperty({ description: 'Carga horária do componente curricular', example: '60h', required: false })
  carga_horaria?: string;

  @ApiProperty({ description: 'Data de criação', example: '2025-01-30T00:00:00', required: false })
  data_criacao?: Date;
}