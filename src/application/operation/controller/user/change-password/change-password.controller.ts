import { Inject } from '@nestjs/common';
import { ChangePasswordDto } from 'src/core/user/dto/update-password.dto';
import { User } from 'src/core/user/entity/user.entity';
import { ChangePasswordUseCase } from 'src/core/user/usecase/user/change-password/change-password.usecase';

export class ChangePasswordController {
  constructor(
    @Inject(ChangePasswordUseCase)
    private changePasswordUseCase: ChangePasswordUseCase,
  ) {}

  async handle(payload: ChangePasswordDto): Promise<User> {
    const password = await this.changePasswordUseCase.execute(payload);

    return password;
  }
}
