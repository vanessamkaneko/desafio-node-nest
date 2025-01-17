import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUserGateway } from 'src/application/operation/gateway/user/IUserGateway';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject(IUserGateway)
    private userGateway: IUserGateway,
  ) {}

  async execute(id: string): Promise<void> {
    const user = await this.userGateway.findUserById(id);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const deleteUser = this.userGateway.delete(id);

    return deleteUser;
  }
}
