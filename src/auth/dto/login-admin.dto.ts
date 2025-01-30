import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail } from "class-validator";


export class LoginAdminDto{
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  senha: string;
}