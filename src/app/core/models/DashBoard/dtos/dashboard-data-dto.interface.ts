import { IOrderDetailsTotalDTO } from './order-details-total-dto.interface';
import { IOrdersTotalDTO } from './orders-total-dto.interface';

export interface IDashBoardDataDTO {
  completedAndInCompletedOrders: IOrdersTotalDTO;
  totalOrderDetailsStatus: IOrderDetailsTotalDTO;
}
