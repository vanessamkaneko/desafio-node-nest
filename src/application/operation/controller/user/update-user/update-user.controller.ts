import { Inject } from '@nestjs/common';
import { UpdateUserDto } from 'src/core/user/dto/update-user.dto';
import { User } from 'src/core/user/entity/user.entity';
import { UpdateUserUseCase } from 'src/core/user/usecase/user/update-user/update-user.usecase';

export class UpdateUserController {
  constructor(
    @Inject(UpdateUserUseCase)
    private updateUserUseCase: UpdateUserUseCase,
  ) {}

  async handle(id: string, payload: UpdateUserDto): Promise<User> {
    const updateUser = await this.updateUserUseCase.execute(id, payload);

    return updateUser;
  }
}
