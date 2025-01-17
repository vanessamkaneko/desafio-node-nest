import { Inject } from '@nestjs/common';
import { CreateOrderDto } from 'src/core/order/dto/create-order.dto';
import { Order } from 'src/core/order/entity/order.entity';
import { CreateOrderUseCase } from 'src/core/order/usecase/order/create-order/create-order.usecase';

export class CreateOrderController {
  constructor(
    @Inject(CreateOrderUseCase)
    private createOrderUseCase: CreateOrderUseCase,
  ) {}

  async handle(payload: CreateOrderDto): Promise<Order> {
    const order = await this.createOrderUseCase.execute(payload);

    return order;
  }
}
