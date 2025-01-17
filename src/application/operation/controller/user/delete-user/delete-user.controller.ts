import { Inject } from '@nestjs/common';
import { DeleteUserUseCase } from 'src/core/user/usecase/user/delete-user/delete-user.usecase';

export class DeleteUserController {
  constructor(
    @Inject(DeleteUserUseCase)
    private deleteUserUseCase: DeleteUserUseCase,
  ) {}

  async handle(id: string): Promise<void> {
    const deleteUser = this.deleteUserUseCase.execute(id);

    return deleteUser;
  }
}
