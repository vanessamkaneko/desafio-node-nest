import { Injectable } from '@nestjs/common';
import { Order } from 'src/core/order/entity/order.entity';
import { OrderModel } from 'src/infrastructure/persistence/bds/mongodb/schema/orderModel';
import {
  IOrderMongoDbRepository,
  IOrderUpdate,
} from './IOrder-mongodb.repository';

@Injectable()
export class OrderMongoDbRepository implements IOrderMongoDbRepository {
  async create(order: Order): Promise<Order> {
    const orderCreated = await OrderModel.create({ ...order });

    await orderCreated.save();

    return orderCreated;
  }

  async update(id: string, payload: IOrderUpdate): Promise<Order> {
    const updatedOrder = await OrderModel.findByIdAndUpdate(id, payload, {
      new: true,
    });

    return updatedOrder;
  }

  async findById(id: string): Promise<Order> {
    const order = await OrderModel.findById(id);

    return order;
  }

  async findByUser(userId: string): Promise<Order[]> {
    const orders = await OrderModel.find({ courier_id: userId });

    return orders;
  }

  async delete(id: string): Promise<void> {
    await OrderModel.findByIdAndDelete(id);
  }
}
