import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  senha: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  cargo: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  departamento: string;
}