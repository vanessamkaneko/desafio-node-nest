import { Module, Provider } from '@nestjs/common';
import { UserControllerRoute } from '../api/http-rest/routes/user.route';
import { IUserMongoDbRepository } from 'src/infrastructure/persistence/repositories/user/mongodb/IUser-mongodb.repository';
import { UserMongoDbRepository } from 'src/infrastructure/persistence/repositories/user/mongodb/User-mongodb.repository';
import { IUserGateway } from '../operation/gateway/user/IUserGateway';
import { UserGateway } from '../operation/gateway/user/UserGateway';
import { CreateUserUseCase } from 'src/core/user/usecase/user/create-user/create-user.usecase';
import { CreateUserController } from '../operation/controller/user/create-user/create-user.controller';
import { AuthenticateUserUseCase } from 'src/core/user/usecase/user/authenticate-user/authenticate-user.usecase';
import { AuthenticateUserController } from '../operation/controller/user/authenticate-user/authenticate-user.controller';
import { GetUserUseCase } from 'src/core/user/usecase/user/get-user/get-user.usecase';
import { GetUserController } from '../operation/controller/user/get-user/get-user.controller';
import { ListUsersUseCase } from 'src/core/user/usecase/user/list-users/list-users.usecase';
import { ListUsersController } from '../operation/controller/user/list-users/list-users.controller';
import { DeleteUserUseCase } from 'src/core/user/usecase/user/delete-user/delete-user.usecase';
import { DeleteUserController } from '../operation/controller/user/delete-user/delete-user.controller';
import { UpdateUserUseCase } from 'src/core/user/usecase/user/update-user/update-user.usecase';
import { UpdateUserController } from '../operation/controller/user/update-user/update-user.controller';
import { ChangePasswordUseCase } from 'src/core/user/usecase/user/change-password/change-password.usecase';
import { ChangePasswordController } from '../operation/controller/user/change-password/change-password.controller';

const persistenceProviders: Provider[] = [
  {
    provide: IUserMongoDbRepository,
    useFactory: () => new UserMongoDbRepository(),
    inject: [],
  },
  {
    provide: IUserGateway,
    useFactory: (userMongoDbRepository: IUserMongoDbRepository) =>
      new UserGateway(userMongoDbRepository),
    inject: [IUserMongoDbRepository],
  },
];

const useCaseProviders: Provider[] = [
  {
    provide: CreateUserUseCase,
    useFactory: (userGateway: IUserGateway) =>
      new CreateUserUseCase(userGateway),
    inject: [IUserGateway],
  },
  {
    provide: UpdateUserUseCase,
    useFactory: (userGateway: IUserGateway) =>
      new UpdateUserUseCase(userGateway),
    inject: [IUserGateway],
  },
  {
    provide: GetUserUseCase,
    useFactory: (userGateway: IUserGateway) => new GetUserUseCase(userGateway),
    inject: [IUserGateway],
  },
  {
    provide: ListUsersUseCase,
    useFactory: (userGateway: IUserGateway) =>
      new ListUsersUseCase(userGateway),
    inject: [IUserGateway],
  },
  {
    provide: DeleteUserUseCase,
    useFactory: (userGateway: IUserGateway) =>
      new DeleteUserUseCase(userGateway),
    inject: [IUserGateway],
  },
  {
    provide: AuthenticateUserUseCase,
    useFactory: (userGateway: IUserGateway) =>
      new AuthenticateUserUseCase(userGateway),
    inject: [IUserGateway],
  },
  {
    provide: ChangePasswordUseCase,
    useFactory: (userGateway: IUserGateway) =>
      new ChangePasswordUseCase(userGateway),
    inject: [IUserGateway],
  },
];

const controllerProviders: Provider[] = [
  {
    provide: CreateUserController,
    useFactory: (createUserUseCase: CreateUserUseCase) =>
      new CreateUserController(createUserUseCase),
    inject: [CreateUserUseCase],
  },
  {
    provide: UpdateUserController,
    useFactory: (updateUserUseCase: UpdateUserUseCase) =>
      new UpdateUserController(updateUserUseCase),
    inject: [UpdateUserUseCase],
  },
  {
    provide: GetUserController,
    useFactory: (getUserUseCase: GetUserUseCase) =>
      new GetUserController(getUserUseCase),
    inject: [GetUserUseCase],
  },
  {
    provide: ListUsersController,
    useFactory: (listUsersUseCase: ListUsersUseCase) =>
      new ListUsersController(listUsersUseCase),
    inject: [ListUsersUseCase],
  },
  {
    provide: DeleteUserController,
    useFactory: (deleteUserUseCase: DeleteUserUseCase) =>
      new DeleteUserController(deleteUserUseCase),
    inject: [DeleteUserUseCase],
  },
  {
    provide: AuthenticateUserController,
    useFactory: (authenticateUserUseCase: AuthenticateUserUseCase) =>
      new AuthenticateUserController(authenticateUserUseCase),
    inject: [AuthenticateUserUseCase],
  },
  {
    provide: ChangePasswordController,
    useFactory: (changePasswordUseCase: ChangePasswordUseCase) =>
      new ChangePasswordController(changePasswordUseCase),
    inject: [ChangePasswordUseCase],
  },
];

@Module({
  imports: [],
  controllers: [UserControllerRoute],
  providers: [
    ...persistenceProviders,
    ...useCaseProviders,
    ...controllerProviders,
  ],
})
export class UserModule {}
