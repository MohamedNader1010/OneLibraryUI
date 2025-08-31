import { CashboxType } from '../../../../enums/cashbox-type.enum';
import { PaymentMethod } from '../../../../enums/payment-method.enum';

export interface IReturnOrderCommand {
  orderDetail: any; // Replace with actual type if available
  paymentMethod: PaymentMethod;
  cashboxType: CashboxType;
}
