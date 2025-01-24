import { Order } from 'src/core/order/entity/order.entity';
import { IOrderUpdate } from 'src/infrastructure/persistence/repositories/order/mongodb/IOrder-mongodb.repository';

export interface ICreateOrder {
  address: string;
  recipient_id: string;
}

export interface IOrderGateway {
  create(payload: Order): Promise<Order>;
  update(id: string, payload: IOrderUpdate): Promise<Order>;
  findOrderById(id: string): Promise<Order>;
  findOrdersByUser(userId: string): Promise<Order[]>;
  findOrdersByAddress(address: string): Promise<Order[]>;
  delete(id: string): Promise<void>;
}

export const IOrderGateway = Symbol('IOrderGateway');
