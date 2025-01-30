import { ApiProperty } from '@nestjs/swagger';

export class GradeCurricularDto {
  @ApiProperty({ description: 'ID da grade curricular', example: 1 })
  id: number;

  @ApiProperty({ description: 'Título da grade curricular', example: 'Grade de Computação' })
  titulo: string;

  @ApiProperty({ description: 'Código da grade curricular', example: 'CC123' })
  codigo: string;

  @ApiProperty({ description: 'Componente curricular', example: 'Programação Web' })
  componente_curricular: string;

  @ApiProperty({ description: 'Ementa do componente curricular', format: 'binary', required: false })
  ementa: any;

  @ApiProperty({ description: 'Carga horária do componente curricular', example: '60h' })
  carga_horaria: string;

  @ApiProperty({ description: 'Data de criação', example: '2025-01-30T00:00:00' })
  data_criacao: Date;
}