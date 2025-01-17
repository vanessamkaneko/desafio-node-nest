import { Inject } from '@nestjs/common';
import { AuthenticateUserDto } from 'src/core/user/dto/authenticate-user.dto';
import { User } from 'src/core/user/entity/user.entity';
import { AuthenticateUserUseCase } from 'src/core/user/usecase/user/authenticate-user/authenticate-user.usecase';

export class AuthenticateUserController {
  constructor(
    @Inject(AuthenticateUserUseCase)
    private authenticateUserUseCase: AuthenticateUserUseCase,
  ) {}

  async handle(payload: AuthenticateUserDto): Promise<User> {
    const user = await this.authenticateUserUseCase.execute(payload);

    return user;
  }
}
