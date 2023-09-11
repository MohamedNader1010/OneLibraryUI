import { OrderDetailStatus } from '../../shared/enums/OrderDetailStatus.enum';
export interface ReservedOrderDetail {
  id?: number;
  noteId: number;
  note: string;
  orderId: number;
  quantity: number;
  orderStatus: OrderDetailStatus;
  filePath: string;
  client: string;
}
