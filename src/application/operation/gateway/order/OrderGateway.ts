import { Inject } from '@nestjs/common';
import { Order } from 'src/core/order/entity/order.entity';
import {
  IOrderMongoDbRepository,
  IOrderUpdate,
} from 'src/infrastructure/persistence/repositories/order/mongodb/IOrder-mongodb.repository';
import { IOrderGateway } from './IOrderGateway';

export class OrderGateway implements IOrderGateway {
  constructor(
    @Inject(IOrderMongoDbRepository)
    private orderRepository: IOrderMongoDbRepository,
  ) {}

  async create(payload: Order): Promise<Order> {
    const order = await this.orderRepository.create(payload);

    return order;
  }

  async update(id: string, payload: IOrderUpdate): Promise<Order> {
    const order = await this.orderRepository.update(id, payload);

    return order;
  }

  async findOrderById(id: string): Promise<Order> {
    const order = await this.orderRepository.findById(id);

    return order;
  }

  async findOrdersByUser(userId: string): Promise<Order[]> {
    const orders = await this.orderRepository.findByUser(userId);

    return orders;
  }

  async delete(id: string): Promise<void> {
    const order = await this.orderRepository.delete(id);

    return order;
  }
}
