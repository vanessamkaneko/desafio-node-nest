import { IsString } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  cpf: string;

  @IsString()
  password: string;
}
