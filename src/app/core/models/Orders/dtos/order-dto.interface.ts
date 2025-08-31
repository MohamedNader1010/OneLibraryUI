import { IBaseDTO } from '../../../Common/models/dtos/base-dto.interfaces';
import { OrderStatus } from '../../../enums/OrderStatus.enum';
import { IOrderDetailDTO } from './order-detail-dto.interface';
import { IClientOverviewDTO } from './../../Clients/dtos/client-overview-dto.interface';

export interface IOrderDTO extends IBaseDTO {
    totalPrice: number;
    finalPrice: number;
    rest: number;
    paid: number;
    discountPercent: number;
    discount: number;
    remarks?: string;
    status: OrderStatus;
    clientType: IClientOverviewDTO;
    client: IClientOverviewDTO;
    orderDetails: IOrderDetailDTO[];
}
