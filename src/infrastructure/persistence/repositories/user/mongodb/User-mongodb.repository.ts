import { Injectable } from '@nestjs/common';
import { ListUsersDto } from 'src/core/user/dto/list-users.dto';
import { User } from 'src/core/user/entity/user.entity';
import { UserModel } from 'src/infrastructure/persistence/bds/mongodb/schema/userModel';
import {
  IUserFindFields,
  IUserMongoDbRepository,
  IUserUpdate,
} from './IUser-mongodb.repository';

@Injectable()
export class UserMongoDbRepository implements IUserMongoDbRepository {
  async create(user: User): Promise<User> {
    const userCreated = await UserModel.create({ ...user });

    await userCreated.save();

    return userCreated;
  }

  async update(id: string, payload: IUserUpdate): Promise<User> {
    const updatedUser = await UserModel.findByIdAndUpdate(id, payload, {
      new: true,
    });

    return updatedUser;
  }

  async findOne(payload: IUserFindFields): Promise<User> {
    const user = await UserModel.findOne(payload);

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await UserModel.findById(id);

    return user;
  }

  async findAll(query: ListUsersDto): Promise<User[]> {
    const info = { user_type: query.user_type.toLowerCase() };

    const users = await UserModel.find(info);

    return users;
  }

  async delete(id: string): Promise<void> {
    await UserModel.findByIdAndDelete(id);
  }
}
