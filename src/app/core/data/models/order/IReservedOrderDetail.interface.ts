import { OrderDetailStatus } from '../../../../shared/enums/OrderDetailStatus.enum';

export interface ReservedOrderDetail {
  id?: number;
  noteId: number;
  note: string;
  orderId: number;
  quantity: number;
  status: OrderDetailStatus;
  filePath: string;
  client: string;
}
