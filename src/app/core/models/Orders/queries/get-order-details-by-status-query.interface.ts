import { IPaginationRequest } from '../../../Common/models/request/pagination-request.model';
import { OrderDetailStatus } from '../../../enums/OrderDetailStatus.enum';

export interface IGetOrderDetailsByStatusQuery extends IPaginationRequest {
    status: OrderDetailStatus;
}
