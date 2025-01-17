import { Inject } from '@nestjs/common';
import { DeleteOrderUseCase } from 'src/core/order/usecase/order/delete-order/delete-order.usecase';

export class DeleteOrderController {
  constructor(
    @Inject(DeleteOrderUseCase)
    private deleteOrderUseCase: DeleteOrderUseCase,
  ) {}

  async handle(id: string): Promise<void> {
    const deleteOrder = this.deleteOrderUseCase.execute(id);

    return deleteOrder;
  }
}
