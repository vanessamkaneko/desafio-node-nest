import mongoose from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';

export enum UserType {
  ADMIN = 'admin',
  COURIER = 'courier',
  RECIPIENT = 'recipient',
}

export class User {
  _id: mongoose.Types.ObjectId;

  name: string;

  cpf: string;

  email: string;

  password: string;

  address: string;

  user_type: UserType;

  private constructor(payload: CreateUserDto) {
    this.name = payload.name;
    this.cpf = payload.cpf;
    this.email = payload.email;
    this.password = payload.password;
    this.address = payload.address;
    this.user_type = payload.user_type;
  }

  public static new(payload: CreateUserDto) {
    const user = new User(payload);
    return user;
  }
}
