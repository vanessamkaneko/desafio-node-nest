import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IUserGateway } from 'src/application/operation/gateway/user/IUserGateway';
import { ListUsersDto } from 'src/core/user/dto/list-users.dto';
import { User, UserType } from 'src/core/user/entity/user.entity';

@Injectable()
export class ListUsersUseCase {
  constructor(
    @Inject(IUserGateway)
    private userGateway: IUserGateway,
  ) {}

  async execute(query: ListUsersDto): Promise<User[]> {
    if (
      !query.user_type ||
      !Object.values(UserType).includes(query.user_type)
    ) {
      throw new BadRequestException(
        `Invalid user type: ${query.user_type || 'undefined'}`,
      );
    }

    const listedUsers = await this.userGateway.listUsers(query);

    return listedUsers;
  }
}
