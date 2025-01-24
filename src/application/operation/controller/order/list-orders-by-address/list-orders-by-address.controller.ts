import { Inject } from '@nestjs/common';
import { ListOrdersByAddressDto } from 'src/core/order/dto/list-orders-by-address.dto';
import { Order } from 'src/core/order/entity/order.entity';
import { ListOrdersByAddressUseCase } from 'src/core/order/usecase/order/list-orders-by-address/list-orders-by-address.usecase';

export class ListOrdersByAddressController {
  constructor(
    @Inject(ListOrdersByAddressUseCase)
    private listOrdersByAddressUseCase: ListOrdersByAddressUseCase,
  ) {}

  async handle(cpf: string, query: ListOrdersByAddressDto): Promise<Order[]> {
    const listOrders = this.listOrdersByAddressUseCase.execute(cpf, query);

    return listOrders;
  }
}
