import { CashboxType } from '../../../enums/cashbox-type.enum';
import { PaymentMethod } from '../../../enums/payment-method.enum';
import { IOrderDetailRequestDTO } from '../dtos/order-detail-request-dto.interface';

export interface ICreateOrderCommand {
    orderDetails: IOrderDetailRequestDTO[];
    clientId: string;
    remarks?: string;
    paid: number;
    paymentMethod: PaymentMethod;
    cashboxType: CashboxType;
}
