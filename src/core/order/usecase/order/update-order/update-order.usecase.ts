import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { INotificationGateway } from 'src/application/operation/gateway/notification/INotificationGateway';
import { IOrderGateway } from 'src/application/operation/gateway/order/IOrderGateway';
import { IUserGateway } from 'src/application/operation/gateway/user/IUserGateway';
import { UpdateOrderDto } from 'src/core/order/dto/update-order.dto';
import { Order, StatusType } from 'src/core/order/entity/order.entity';

@Injectable()
export class UpdateOrderUseCase {
  constructor(
    @Inject(IOrderGateway)
    private orderGateway: IOrderGateway,
    private userGateway: IUserGateway,
    private notificationGateway: INotificationGateway,
  ) {}

  async execute(
    orderId: string,
    courierId: string,
    payload: UpdateOrderDto,
  ): Promise<Order> {
    const order = await this.orderGateway.findOrderById(orderId);

    if (!order) {
      throw new NotFoundException('Order not found!');
    }

    const courier = await this.userGateway.findUserById(courierId);

    if (!courier) {
      throw new NotFoundException('Courier not found!');
    }

    if (payload.status) {
      if (!Object.values(StatusType).includes(payload.status)) {
        throw new BadRequestException(`Invalid status type: ${payload.status}`);
      }

      if (
        payload.status === 'Delivered' &&
        (!order.courier_id.equals(courier._id) || !payload.photo)
      ) {
        throw new BadRequestException(
          'Only the courier who accepted the order can change the status to delivered and a photo must be provided!',
        );
      }

      const updateOrder = await this.orderGateway.update(orderId, payload);

      if (payload.status !== order.status) {
        const recipientId = order.recipient_id.toString();

        await this.notificationGateway.sendNotification(recipientId, orderId);
      }

      return updateOrder;
    }

    throw new BadRequestException('Status is required!');
  }
}
