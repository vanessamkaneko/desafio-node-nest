import {
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { IUserGateway } from '../operation/gateway/user/IUserGateway';

export class AdminGuard implements CanActivate {
  constructor(
    @Inject(IUserGateway)
    private userGateway: IUserGateway,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const { userCpf } = request.session;

    const user = await this.userGateway.findUserByCpf(userCpf);

    if (user.user_type !== 'admin') {
      throw new UnauthorizedException('Only admins can complete this action!');
    }

    return true;
  }
}
