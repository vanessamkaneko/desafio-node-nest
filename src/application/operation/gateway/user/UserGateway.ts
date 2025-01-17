import { Inject } from '@nestjs/common';
import { CreateUserDto } from 'src/core/user/dto/create-user.dto';
import { ListUsersDto } from 'src/core/user/dto/list-users.dto';
import { User } from 'src/core/user/entity/user.entity';
import {
  IUserMongoDbRepository,
  IUserUpdate,
} from 'src/infrastructure/persistence/repositories/user/mongodb/IUser-mongodb.repository';
import { IUserGateway } from './IUserGateway';

export class UserGateway implements IUserGateway {
  constructor(
    @Inject(IUserMongoDbRepository)
    private userRepository: IUserMongoDbRepository,
  ) {}

  async create(payload: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create(payload);

    return user;
  }

  async update(id: string, payload: IUserUpdate): Promise<User> {
    const user = await this.userRepository.update(id, payload);

    return user;
  }

  async updatePassword(id: string, password: string): Promise<User> {
    const newPassword = await this.userRepository.update(id, { password });

    return newPassword;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ email });

    return user;
  }

  async findUserByCpf(cpf: string): Promise<User> {
    const user = await this.userRepository.findOne({ cpf });

    return user;
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);

    return user;
  }

  async listUsers(query: ListUsersDto): Promise<User[]> {
    const users = await this.userRepository.findAll(query);

    return users;
  }

  async delete(id: string): Promise<void> {
    const user = await this.userRepository.delete(id);

    return user;
  }
}
