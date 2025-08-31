import { Injectable } from '@angular/core';
import { BaseApiRepository } from './common/base-api.repository';
import { Observable } from 'rxjs';
import { BACKEND_APIs } from '../apis/backend-apis';
import { IPagedResponse } from '../Common/models/response/paged-response.interface';
import { IMaterialTransactionDTO } from '../models/MaterialTransactions/dtos/material-transaction-dto.interface';

@Injectable({ providedIn: 'root' })
export class MaterialTransactionRepository extends BaseApiRepository {
    getAllPaginated = (query: any): Observable<IPagedResponse<IMaterialTransactionDTO>> =>
        this.getPaginated<IPagedResponse<IMaterialTransactionDTO>>(BACKEND_APIs.materialTransactions.root, query);
}
