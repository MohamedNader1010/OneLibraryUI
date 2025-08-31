import { PaymentMethod } from '../../../../enums/payment-method.enum';

export interface IOrderTransactionDto {
  id?: string;
  orderId: string;
  paid: number;
  paymentMethod: PaymentMethod;
}
