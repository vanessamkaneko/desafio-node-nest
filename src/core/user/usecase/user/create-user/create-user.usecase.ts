import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IUserGateway } from 'src/application/operation/gateway/user/IUserGateway';
import { CreateUserDto } from 'src/core/user/dto/create-user.dto';
import { User } from 'src/core/user/entity/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(IUserGateway)
    private userGateway: IUserGateway,
  ) {}

  async execute(payload: CreateUserDto): Promise<User> {
    const emailAlreadyExists = await this.userGateway.findUserByEmail(
      payload.email,
    );

    if (emailAlreadyExists) {
      throw new BadRequestException('E-mail already in use!');
    }

    const cpfAlreadyExists = await this.userGateway.findUserByCpf(payload.cpf);

    if (cpfAlreadyExists) {
      throw new BadRequestException(
        'There is already an user registered with this CPF!',
      );
    }

    const password_hash = await bcrypt.hash(payload.password, 6);

    const userData = {
      ...payload,
      password: password_hash,
    };

    const newUser = User.new(userData);

    const user = await this.userGateway.create(newUser);

    return user;
  }
}
