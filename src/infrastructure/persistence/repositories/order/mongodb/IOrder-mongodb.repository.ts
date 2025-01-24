import mongoose from 'mongoose';
import { Order } from 'src/core/order/entity/order.entity';

export interface IOrderUpdate {
  status?: string;
  address?: string;
  photo?: string;
  recipient_id?: mongoose.Types.ObjectId;
  courier_id?: mongoose.Types.ObjectId;
}

export interface IOrderFindFields {
  address?: string;
  courier_id?: string;
}

export interface IOrderMongoDbRepository {
  create(user: Order): Promise<Order>;
  update(id: string, payload: IOrderUpdate): Promise<Order>;
  findById(id: string): Promise<Order>;
  find(payload: IOrderFindFields): Promise<Order[]>;
  delete(id: string): Promise<void>;
}

export const IOrderMongoDbRepository = Symbol('IOrderMongoDbRepository');
