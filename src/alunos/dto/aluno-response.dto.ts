import { ApiProperty } from '@nestjs/swagger';

export class AlunoResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'João Pedro' })
  nome: string;

  @ApiProperty({ example: 'joao@email.com' })
  email: string;

  @ApiProperty({ example: '8763mat20018' })
  matricula: string;

  @ApiProperty({ example: 'Matemática' })
  curso: string;
}