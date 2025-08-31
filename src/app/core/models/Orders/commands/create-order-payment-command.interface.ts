import { IPaymentBaseCommand } from '../../../Common/commands/payment-base-command.interface';

export interface ICreateOrderPaymentCommand extends IPaymentBaseCommand {
    orderId: string;
}
