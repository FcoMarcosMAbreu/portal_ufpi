import { ApiProperty } from '@nestjs/swagger';

export class ProcessoSeletivoDto {
  @ApiProperty({ description: 'ID do processo seletivo' })
  id: number;

  @ApiProperty({ description: 'Título do processo seletivo' })
  titulo: string;

  @ApiProperty({ description: 'Descrição do processo seletivo' })
  descricao: string;

  @ApiProperty({ description: 'Link de inscrição para o processo seletivo', example: 'https://example.com' })
  link_inscricao: string;

  @ApiProperty({ description: 'Data de criação do processo seletivo', example: '2025-01-30T00:00:00.000Z' })
  data_criacao: Date;
}
