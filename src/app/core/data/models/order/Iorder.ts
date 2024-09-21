import { OrderStatus } from '../../../../shared/enums/OrderStatus.enum';
import { OrderDetail } from './IorderDetail';
import { OrderTransaction } from './IorderTransaction';
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
  status: OrderStatus;
  clientId: number;
  clientName: string;
  clientTypeName: string;
  clientTypeId: number;
  orderDetails: OrderDetail[];
  transactions: OrderTransaction[];
  clientPhoneNumber: string;
}
