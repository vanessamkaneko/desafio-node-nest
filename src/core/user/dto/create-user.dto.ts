import { IsEmail, IsString } from 'class-validator';
import { UserType } from '../entity/user.entity';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  cpf: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  address: string;

  user_type: UserType;
}
