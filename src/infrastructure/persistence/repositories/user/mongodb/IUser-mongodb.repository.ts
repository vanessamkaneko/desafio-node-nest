import { CreateUserDto } from 'src/core/user/dto/create-user.dto';
import { ListUsersDto } from 'src/core/user/dto/list-users.dto';
import { User } from 'src/core/user/entity/user.entity';

export interface IUserUpdate {
  name?: string;
  cpf?: string;
  email?: string;
  address?: string;
  user_type?: string;
  password?: string;
}

export interface IUserFindFields {
  email?: string;
  cpf?: string;
}

export interface IUserMongoDbRepository {
  create(user: CreateUserDto): Promise<User>;
  update(id: string, payload: IUserUpdate): Promise<User>;
  findOne(payload: IUserFindFields): Promise<User>;
  findById(id: string): Promise<User | null>;
  findAll(query: ListUsersDto): Promise<User[]>;
  delete(id: string): Promise<void>;
}

export const IUserMongoDbRepository = Symbol('IUserMongoDbRepository');
