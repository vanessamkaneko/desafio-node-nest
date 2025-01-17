import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IOrderGateway } from 'src/application/operation/gateway/order/IOrderGateway';
import { UpdateOrderDto } from 'src/core/order/dto/update-order.dto';
import { Order, StatusType } from 'src/core/order/entity/order.entity';

@Injectable()
export class UpdateOrderUseCase {
  constructor(
    @Inject(IOrderGateway)
    private orderGateway: IOrderGateway,
  ) {}

  async execute(id: string, payload: UpdateOrderDto): Promise<Order> {
    const order = await this.orderGateway.findOrderById(id);

    if (!order) {
      throw new NotFoundException('Order not found!');
    }

    if (!Object.values(StatusType).includes(payload.status)) {
      throw new BadRequestException(`Invalid status type: ${payload.status}`);
    }

    const updateOrder = await this.orderGateway.update(id, payload);

    return updateOrder;
  }
}
