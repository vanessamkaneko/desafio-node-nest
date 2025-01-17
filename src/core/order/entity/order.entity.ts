import mongoose from 'mongoose';
import { ICreateOrder } from 'src/application/operation/gateway/order/IOrderGateway';

export enum StatusType {
  PENDING = 'Order available for pickup',
  DELIVERED = 'Delivered',
  RETURNED = 'Returned',
}

export class Order {
  status: StatusType;

  address: string;

  photo: string;

  recipient_id: mongoose.Types.ObjectId;

  courier_id: mongoose.Types.ObjectId;

  private constructor(payload: ICreateOrder) {
    this.status = StatusType.PENDING;
    this.address = payload.address;
    this.recipient_id = new mongoose.Types.ObjectId(payload.recipient_id);
    this.photo = null;
    this.courier_id = null;
  }

  public static new(payload: ICreateOrder) {
    const order = new Order(payload);
    return order;
  }
}
