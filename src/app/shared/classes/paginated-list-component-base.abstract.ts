import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPagedResponse } from '../../core/Common/models/response/paged-response.interface';
import { IPaginationRequest } from '../../core/Common/models/request/pagination-request.model';
import { DataComponentBase } from './data-component-base.abstract';

@Injectable()
export abstract class PaginatedListComponentBase<T> extends DataComponentBase {
    abstract dataObservableFn(paginationRequest: IPaginationRequest): Observable<IPagedResponse<T>>;
}
