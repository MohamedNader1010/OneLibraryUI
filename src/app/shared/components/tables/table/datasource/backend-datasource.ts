import { IPaginationRequest } from '../../../../../core/Common/models/request/pagination-request.model';
import { signal } from '@angular/core';
import { BaseDataSource } from './base-datasource';

export class BackendDataSource<T> extends BaseDataSource<T> {
    #defaultState: IPaginationRequest = {
        pageIndex: 0,
        pageSize: 25,
        orderBy: 'Id',
        direction: 'desc',
        filters: []
    };

    paginationSignal = signal<IPaginationRequest>(this.#defaultState);

    constructor() {
        super();
    }
}
