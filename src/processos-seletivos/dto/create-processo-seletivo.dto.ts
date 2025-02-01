import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateProcessoSeletivoDto {
  @ApiProperty({ description: 'Título do processo seletivo' })
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @ApiProperty({ description: 'Descrição do processo seletivo' })
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @ApiProperty({ description: 'Link de inscrição para o processo seletivo', example: 'https://example.com' })
  @IsUrl()
  @IsNotEmpty()
  link_inscricao: string;
}
