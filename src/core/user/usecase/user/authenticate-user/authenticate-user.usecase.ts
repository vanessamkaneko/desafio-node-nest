import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IUserGateway } from 'src/application/operation/gateway/user/IUserGateway';
import { AuthenticateUserDto } from 'src/core/user/dto/authenticate-user.dto';
import { User } from 'src/core/user/entity/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    @Inject(IUserGateway)
    private userGateway: IUserGateway,
  ) {}

  async execute(payload: AuthenticateUserDto): Promise<User> {
    const userByCpf = await this.userGateway.findUserByCpf(payload.cpf);

    if (!userByCpf) {
      throw new BadRequestException('Wrong credential!');
    }

    const doesPasswordMatches = await bcrypt.compare(
      payload.password,
      userByCpf.password,
    );

    if (!doesPasswordMatches) {
      throw new BadRequestException('Wrong credential!');
    }

    return userByCpf;
  }
}
