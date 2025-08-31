import { IBaseFilterParams } from './base-filter-params.model';

export interface IPaginationRequest {
    pageIndex: number;
    pageSize: number;
    filters: IBaseFilterParams[];
    orderBy: string;
    direction: 'asc' | 'desc' | '';
}
