// src/professores/dto/create-professor.dto.ts
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Nivel, Vinculo } from '../professores.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProfessorDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  matricula: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsEnum(Nivel)
  nivel: Nivel;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  telefone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  curriculo_lattes: string;

  @ApiProperty()
  @IsEnum(Vinculo)
  vinculo: Vinculo;

  @ApiProperty()
  @IsNotEmpty()
  data_criacao: Date;
}