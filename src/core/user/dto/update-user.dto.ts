import { IsString } from 'class-validator';
import { UserType } from '../entity/user.entity';

export class UpdateUserDto {
  @IsString()
  name?: string;

  @IsString()
  cpf?: string;

  @IsString()
  email?: string;

  @IsString()
  address?: string;

  user_type?: UserType;
}
