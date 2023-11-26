import { ReservedOrderDetail } from './ReservedOrderDetail.model';

export interface ReservedNote {
  totalQuantity: number;
  noteId: number;
  note: string;
  noteQuantity: number;
  orderDetails: ReservedOrderDetail[];
}
