import mongoose from 'mongoose';
import { StatusType } from '../entity/order.entity';

export class UpdateOrderDto {
  status?: StatusType;

  address?: string;

  photo?: string;

  recipient_id?: mongoose.Types.ObjectId;

  courier_id?: mongoose.Types.ObjectId;
}
