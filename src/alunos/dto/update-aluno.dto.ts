import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail } from 'class-validator';

export class UpdateAlunoDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  nome?: string;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  matricula?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  curso?: string;
}