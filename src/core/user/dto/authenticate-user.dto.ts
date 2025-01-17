import { IsString } from 'class-validator';

export class AuthenticateUserDto {
  @IsString()
  cpf: string;

  @IsString()
  password: string;
}
