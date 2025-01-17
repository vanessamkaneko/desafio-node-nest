import { Inject } from '@nestjs/common';
import { UpdateOrderDto } from 'src/core/order/dto/update-order.dto';
import { Order } from 'src/core/order/entity/order.entity';
import { UpdateOrderUseCase } from 'src/core/order/usecase/order/update-order/update-order.usecase';

export class UpdateOrderController {
  constructor(
    @Inject(UpdateOrderUseCase)
    private updateOrderUseCase: UpdateOrderUseCase,
  ) {}

  async handle(id: string, payload: UpdateOrderDto): Promise<Order> {
    const updateOrder = await this.updateOrderUseCase.execute(id, payload);

    return updateOrder;
  }
}
