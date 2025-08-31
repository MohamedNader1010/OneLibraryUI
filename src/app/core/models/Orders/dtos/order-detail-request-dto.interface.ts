import { OrderDetailStatus } from '../../../enums/OrderDetailStatus.enum';

export interface IOrderDetailRequestDTO {
    status: OrderDetailStatus;
    quantity: number;
    serviceId?: string;
    noteId?: string;
}
