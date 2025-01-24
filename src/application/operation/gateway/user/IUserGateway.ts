import { CreateUserDto } from 'src/core/user/dto/create-user.dto';
import { ListUsersDto } from 'src/core/user/dto/list-users.dto';
import { User } from 'src/core/user/entity/user.entity';
import { IUserUpdate } from 'src/infrastructure/persistence/repositories/user/mongodb/IUser-mongodb.repository';

export interface IUserGateway {
  create(payload: CreateUserDto): Promise<User>;
  update(id: string, payload: IUserUpdate): Promise<User>;
  findUserByEmail(email: string): Promise<User>;
  findUserByCpf(cpf: string): Promise<User>;
  findUserById(id: string): Promise<User>;
  listUsers(query: ListUsersDto): Promise<User[]>;
  delete(id: string): Promise<void>;
  updatePassword(id: string, password: string): Promise<User>;
}

export const IUserGateway = Symbol('IUserGateway');
