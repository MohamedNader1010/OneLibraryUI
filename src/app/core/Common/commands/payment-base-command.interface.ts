import { CashboxType } from '../../enums/cashbox-type.enum';
import { PaymentMethod } from '../../enums/payment-method.enum';

export interface IPaymentBaseCommand {
    amount: number;
    paymentMethod: PaymentMethod;
    cashboxType: CashboxType;
}
