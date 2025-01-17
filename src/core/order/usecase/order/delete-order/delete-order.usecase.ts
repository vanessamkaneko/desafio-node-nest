import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IOrderGateway } from 'src/application/operation/gateway/order/IOrderGateway';

@Injectable()
export class DeleteOrderUseCase {
  constructor(
    @Inject(IOrderGateway)
    private orderGateway: IOrderGateway,
  ) {}

  async execute(id: string): Promise<void> {
    const order = await this.orderGateway.findOrderById(id);

    if (!order) {
      throw new NotFoundException('User not found!');
    }

    const deleteOrder = this.orderGateway.delete(id);

    return deleteOrder;
  }
}
