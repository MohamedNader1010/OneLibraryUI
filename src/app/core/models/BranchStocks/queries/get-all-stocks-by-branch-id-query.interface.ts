import { IPaginationRequest } from '../../../Common/models/request/pagination-request.model';

export interface IGetAllStocksByBranchIdQuery extends IPaginationRequest {
    branchId: string;
}
