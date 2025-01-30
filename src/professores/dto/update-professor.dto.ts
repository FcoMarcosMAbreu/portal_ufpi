// src/professores/dto/update-professor.dto.ts
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Nivel, Vinculo } from '../professores.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfessorDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  nome?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  matricula?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  email?: string;

  @IsOptional()
  @IsEnum(Nivel)
  @ApiProperty()
  nivel?: Nivel;

  @IsOptional()
  @IsString()
  @ApiProperty()
  telefone?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  curriculo_lattes?: string;

  @IsOptional()
  @IsEnum(Vinculo)
  @ApiProperty()
  vinculo?: Vinculo;

  @IsOptional()
  @ApiProperty()
  data_criacao?: Date;
}