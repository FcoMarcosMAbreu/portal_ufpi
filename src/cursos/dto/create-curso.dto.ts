import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, IsDate, IsNotEmpty } from 'class-validator';

export class CreateCursoDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl({}, { message: 'O link do documento da CAPES deve ser uma URL válida' })
  link_documento_capes: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl({}, { message: 'O link dos detalhes do curso deve ser uma URL válida' })
  link_detalhes_curso: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  data_criacao: Date;
}