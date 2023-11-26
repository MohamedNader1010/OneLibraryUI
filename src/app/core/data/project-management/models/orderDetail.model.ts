import { OrderDetailStatus } from '../../../../shared/enums/OrderDetailStatus.enum';
export interface OrderDetail {
  id?: number;
  price: string;
  serviceId: number | null;
  service: string | null;
  noteId: number | null;
  note: string | null;
  orderId: number;
  quantity: number;
  orderStatus: OrderDetailStatus;
  filePath: string;
}
