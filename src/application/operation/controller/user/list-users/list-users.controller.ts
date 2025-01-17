import { Inject } from '@nestjs/common';
import { ListUsersDto } from 'src/core/user/dto/list-users.dto';
import { User } from 'src/core/user/entity/user.entity';
import { ListUsersUseCase } from 'src/core/user/usecase/user/list-users/list-users.usecase';

export class ListUsersController {
  constructor(
    @Inject(ListUsersUseCase)
    private listUsersUseCase: ListUsersUseCase,
  ) {}

  async handle(query: ListUsersDto): Promise<User[]> {
    const listUsers = await this.listUsersUseCase.execute(query);

    return listUsers;
  }
}
