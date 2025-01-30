import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UpdateAdminDto {
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
  senha?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  cargo?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  departamento?: string;
}