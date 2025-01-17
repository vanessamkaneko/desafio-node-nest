import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUserGateway } from 'src/application/operation/gateway/user/IUserGateway';
import { User } from 'src/core/user/entity/user.entity';

@Injectable()
export class GetUserUseCase {
  constructor(
    @Inject(IUserGateway)
    private userGateway: IUserGateway,
  ) {}

  async execute(id: string): Promise<User> {
    const user = await this.userGateway.findUserById(id);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }
}
