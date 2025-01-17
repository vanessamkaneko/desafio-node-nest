import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { IUserGateway } from 'src/application/operation/gateway/user/IUserGateway';
import { ChangePasswordDto } from 'src/core/user/dto/update-password.dto';
import { User } from 'src/core/user/entity/user.entity';

@Injectable()
export class ChangePasswordUserUseCase {
  constructor(
    @Inject(IUserGateway)
    private userGateway: IUserGateway,
  ) {}

  async execute(payload: ChangePasswordDto): Promise<User> {
    const userByCpf = await this.userGateway.findUserByCpf(payload.cpf);

    if (!userByCpf) {
      throw new BadRequestException('Wrong credential!');
    }

    const newPassword = await bcrypt.hash(payload.password, 6);

    userByCpf.password = newPassword;

    const updatePassword = this.userGateway.updatePassword(
      userByCpf._id.toString(),
      newPassword,
    );

    return updatePassword;
  }
}
