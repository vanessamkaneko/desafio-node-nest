import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUserGateway } from 'src/application/operation/gateway/user/IUserGateway';
import { UpdateUserDto } from 'src/core/user/dto/update-user.dto';
import { User } from 'src/core/user/entity/user.entity';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(IUserGateway)
    private userGateway: IUserGateway,
  ) {}

  async execute(id: string, payload: UpdateUserDto): Promise<User> {
    const user = await this.userGateway.findUserById(id);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const updateUser = await this.userGateway.update(id, payload);

    return updateUser;
  }
}
