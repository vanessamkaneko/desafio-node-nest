import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  ICreateOrder,
  IOrderGateway,
} from 'src/application/operation/gateway/order/IOrderGateway';
import { IUserGateway } from 'src/application/operation/gateway/user/IUserGateway';
import { CreateOrderDto } from 'src/core/order/dto/create-order.dto';
import { Order } from 'src/core/order/entity/order.entity';

@Injectable()
export class CreateOrderUseCase {
  constructor(
    @Inject(IOrderGateway)
    private orderGateway: IOrderGateway,
    @Inject(IUserGateway)
    private userGateway: IUserGateway,
  ) {}

  async execute(payload: CreateOrderDto): Promise<Order> {
    const user = await this.userGateway.findUserById(payload.recipient_id);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const orderParams = {
      recipient_id: payload.recipient_id,
      address: user.address,
    } as ICreateOrder;

    const newOrder = Order.new(orderParams);

    const order = await this.orderGateway.create(newOrder);

    return order;
  }
}
