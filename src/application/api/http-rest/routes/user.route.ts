import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/application/guard/admin.guard';
import { AuthGuard } from 'src/application/guard/auth.guard';
import { AuthenticateUserController } from 'src/application/operation/controller/user/authenticate-user/authenticate-user.controller';
import { ChangePasswordController } from 'src/application/operation/controller/user/change-password/change-password.controller';
import { CreateUserController } from 'src/application/operation/controller/user/create-user/create-user.controller';
import { DeleteUserController } from 'src/application/operation/controller/user/delete-user/delete-user.controller';
import { GetUserController } from 'src/application/operation/controller/user/get-user/get-user.controller';
import { ListUsersController } from 'src/application/operation/controller/user/list-users/list-users.controller';
import { UpdateUserController } from 'src/application/operation/controller/user/update-user/update-user.controller';
import { AuthenticateUserDto } from 'src/core/user/dto/authenticate-user.dto';
import { CreateUserDto } from 'src/core/user/dto/create-user.dto';
import { ListUsersDto } from 'src/core/user/dto/list-users.dto';
import { ChangePasswordDto } from 'src/core/user/dto/update-password.dto';
import { UpdateUserDto } from 'src/core/user/dto/update-user.dto';
import { User } from 'src/core/user/entity/user.entity';

@Controller('/user')
export class UserControllerRoute {
  constructor(
    private createUserController: CreateUserController,
    private authenticateUserController: AuthenticateUserController,
    private getUserController: GetUserController,
    private listUsersController: ListUsersController,
    private deleteUserController: DeleteUserController,
    private updateUserController: UpdateUserController,
    private changePasswordController: ChangePasswordController,
  ) {}

  @UseGuards(AdminGuard)
  @Post('/')
  async create(@Body() payload: CreateUserDto): Promise<User> {
    const createUser = await this.createUserController.handle(payload);
    return createUser;
  }

  @Post('/login')
  async authenticate(
    @Body() payload: AuthenticateUserDto,
    @Session() session: any,
  ): Promise<User> {
    const user = await this.authenticateUserController.handle(payload);

    session.userCpf = user.cpf;

    return user;
  }

  @UseGuards(AuthGuard)
  @Post('/signout')
  signOut(@Session() session: any) {
    session.userCpf = null;
  }

  @UseGuards(AuthGuard)
  @Get('/users')
  async listUsers(@Query() query: ListUsersDto): Promise<User[]> {
    const users = await this.listUsersController.handle(query);
    return users;
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Put('/update/:id')
  async update(
    @Param('id') id: string,
    @Body() payload: UpdateUserDto,
  ): Promise<User> {
    const updateUser = await this.updateUserController.handle(id, payload);
    return updateUser;
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    const deleteUser = await this.deleteUserController.handle(id);
    return deleteUser;
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  async getUser(@Param('id') id: string): Promise<User> {
    const user = await this.getUserController.handle(id);
    return user;
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Patch('/change-password')
  async password(@Body() payload: ChangePasswordDto): Promise<User> {
    const newPassword = await this.changePasswordController.handle(payload);
    return newPassword;
  }
}
