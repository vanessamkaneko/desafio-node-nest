import { Inject } from '@nestjs/common';
import { Order } from 'src/core/order/entity/order.entity';
import { ListOrdersUseCase } from 'src/core/order/usecase/order/list-orders/list-orders.usecase';

export class ListOrdersController {
  constructor(
    @Inject(ListOrdersUseCase)
    private listOrdersUseCase: ListOrdersUseCase,
  ) {}

  async handle(cpf: string): Promise<Order[]> {
    const listOrders = this.listOrdersUseCase.execute(cpf);

    return listOrders;
  }
}
