import { Inject } from '@nestjs/common';
import { CreateUserDto } from 'src/core/user/dto/create-user.dto';
import { User } from 'src/core/user/entity/user.entity';
import { CreateUserUseCase } from 'src/core/user/usecase/user/create-user/create-user.usecase';

export class CreateUserController {
  constructor(
    @Inject(CreateUserUseCase)
    private createUserUseCase: CreateUserUseCase,
  ) {}

  async handle(payload: CreateUserDto): Promise<User> {
    const user = await this.createUserUseCase.execute(payload);

    return user;
  }
}
