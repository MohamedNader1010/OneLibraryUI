import { OrderDetailStatus } from '../../../enums/OrderDetailStatus.enum';

export interface IOrderDetailDTO {
    id: string;
    price: number;
    status: OrderDetailStatus;
    quantity: number;
    serviceId?: string;
    noteId?: string;
    note?: string;
    service?: string;
    orderId?: string;
    filePath?: string;
}
