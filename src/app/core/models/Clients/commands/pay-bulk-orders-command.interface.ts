import { PaymentMethod } from '../../../enums/payment-method.enum';

export interface IPayBulkOrdersCommand {
    clientId: string;
    amount: number;
    paymentMethod: PaymentMethod;
}
