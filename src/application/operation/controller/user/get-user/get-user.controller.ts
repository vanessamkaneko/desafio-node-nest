import { Inject } from '@nestjs/common';
import { User } from 'src/core/user/entity/user.entity';
import { GetUserUseCase } from 'src/core/user/usecase/user/get-user/get-user.usecase';

export class GetUserController {
  constructor(
    @Inject(GetUserUseCase)
    private getUserUseCase: GetUserUseCase,
  ) {}

  async handle(id: string): Promise<User> {
    const user = await this.getUserUseCase.execute(id);

    return user;
  }
}
