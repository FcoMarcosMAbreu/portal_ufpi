import { IsString, IsEmail, IsEnum, IsNotEmpty } from "class-validator";


export class CreateAdminDto{
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  email: string;

  @IsString()
  senha: string;

  @IsString()
  cargo: string;

  @IsString()
  departamento: string;
}