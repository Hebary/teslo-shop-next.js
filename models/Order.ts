import mongoose, { Model, model, Schema } from 'mongoose';
import { IOrder } from '../interfaces';

const orderSchema: Schema = new Schema({

    name: { type: String, required: true },

    },{
  timestamps: true
});

const Order: Model<IOrder> = mongoose.models.User || model<IOrder>('Order', orderSchema);

export default Order;