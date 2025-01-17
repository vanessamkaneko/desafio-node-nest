import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import {
  Order as OrderEntity,
  StatusType,
} from 'src/core/order/entity/order.entity';

export const OrderSchema = new Schema<OrderEntity>({
  status: { type: String, required: true, enum: Object.values(StatusType) },
  address: { type: String, required: true },
  photo: { type: String },
  recipient_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  courier_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
});

OrderSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

export const OrderModel = mongoose.model('Order', OrderSchema);
