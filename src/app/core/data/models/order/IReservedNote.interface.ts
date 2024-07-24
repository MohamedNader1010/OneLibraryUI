import { ReservedOrderDetail } from './IReservedOrderDetail.interface';

export interface ReservedNote {
  totalQuantity: number;
  noteId: number;
  note: string;
  noteQuantity: number;
  orderDetails: ReservedOrderDetail[];
}
