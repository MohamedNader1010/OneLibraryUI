import { OrderDetail } from './orderDetail.model';
import { OrderTransaction } from './orderTransaction.model';
export interface Order {
  id: number;
  createdOn: Date;
  createdBy: string;
  totalPrice: string;
  finalPrice: string;
  rest: string;
  paid: string;
  discountPercent: string;
  discount: string;
  remarks: string;
  orderStatus: number;
  clientId: number;
  clientName: string;
  clientTypeName: string;
  clientTypeId: number;
  orderDetails: OrderDetail[];
  ordertransaction: OrderTransaction[];
  clientPhoneNumber: string;
}
