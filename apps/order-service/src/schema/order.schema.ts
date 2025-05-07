import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Order {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  bookId: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  totalPrice: number;
}

export type OrderDocument = Order & Document;

export const OrderSchema = SchemaFactory.createForClass(Order);
