import { ApiProperty } from '@nestjs/swagger';

export class AdminResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nome: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  cargo: string;

  @ApiProperty()
  departamento: string;

  @ApiProperty()
  data_criacao: Date;
}