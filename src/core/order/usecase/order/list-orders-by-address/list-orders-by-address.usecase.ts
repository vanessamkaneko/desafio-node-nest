import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IOrderGateway } from 'src/application/operation/gateway/order/IOrderGateway';
import { IUserGateway } from 'src/application/operation/gateway/user/IUserGateway';
import { ListOrdersByAddressDto } from 'src/core/order/dto/list-orders-by-address.dto';
import { Order } from 'src/core/order/entity/order.entity';

@Injectable()
export class ListOrdersByAddressUseCase {
  constructor(
    @Inject(IOrderGateway)
    private orderGateway: IOrderGateway,
    private userGateway: IUserGateway,
  ) {}

  async execute(cpf: string, query: ListOrdersByAddressDto): Promise<Order[]> {
    const user = await this.userGateway.findUserByCpf(cpf);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const matchingOrders = await this.orderGateway.findOrdersByAddress(
      query.address,
    );

    const filteredOrders = matchingOrders.filter((order) => {
      return (
        order.address === user.address && order.courier_id?.equals(user._id)
      );
    });

    if (filteredOrders.length === 0) {
      throw new NotFoundException('There are no orders for your location!');
    }

    return filteredOrders;
  }
}
