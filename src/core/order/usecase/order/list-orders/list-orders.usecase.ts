import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IOrderGateway } from 'src/application/operation/gateway/order/IOrderGateway';
import { IUserGateway } from 'src/application/operation/gateway/user/IUserGateway';
import { Order } from 'src/core/order/entity/order.entity';

@Injectable()
export class ListOrdersUseCase {
  constructor(
    @Inject(IOrderGateway)
    private orderGateway: IOrderGateway,
    private userGateway: IUserGateway,
  ) {}

  async execute(cpf: string): Promise<Order[]> {
    const user = await this.userGateway.findUserByCpf(cpf);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const orders = await this.orderGateway.findOrdersByUser(
      user._id.toString(),
    );

    if (!orders || orders.length === 0) {
      throw new NotFoundException('There are no orders for this user');
    }

    return orders;
  }
}
