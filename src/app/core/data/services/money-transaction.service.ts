import { Injectable } from '@angular/core';
import { BaseHttpClient } from '../../../shared/classes/base-http-client.abstract';
import { ResponseDto } from '../../../shared/interfaces/response.dto';
import { BACKEND_APIs } from '../apis/backend-apis';
import { Transaction } from '../models/money-transaction/ITransaction';
import { map, tap, finalize } from 'rxjs';
import { IGenericResponseDto } from '../../../shared/interfaces/generic-response.interface';
import { IPaginatedResponse } from '../../../shared/interfaces/pagination-response.interface';
import { IPagingCriteria } from '../interfaces/paging-criteria.interface';

@Injectable({
  providedIn: 'root',
})
export class MoneyTransactionService extends BaseHttpClient {
  #bankId!: number;

  get bankId(): number {
    return this.#bankId;
  }

  set bankId(value: number) {
    this.#bankId = value;
  }

  getAll = () => this.httpClient.get<ResponseDto>(`${BACKEND_APIs.transaction}`, { headers: this.headers });

  getAllDataForTable() {
    this.loadingData.next(true);
    this.getAll().subscribe({
      next: (data: ResponseDto) => {
        this.dataChange.next(data);
      },
      error: () => this.loadingData.next(false),
      complete: () => this.loadingData.next(false),
    });
  }

  getPagedData(pagingCriteria: IPagingCriteria = this._pagingCriteria) {
    this.loadingData.next(true);
    const params = this.convertToHttpParams(pagingCriteria);
    return this.httpClient.get<IGenericResponseDto<IPaginatedResponse<Transaction>>>(BACKEND_APIs.transactionsByBankId(this.bankId), { headers: this.headers, params }).pipe(
      map((data) => {
        return {
          status: data.status,
          message: data.message,
          body: data.body.results,
          totalCount: data.body.totalCount,
        };
      }),
      tap((data: ResponseDto) => this.dataChange.next(data)),
      finalize(() => this.loadingData.next(false)),
    );
  }

  add = (model: Transaction) => this.httpClient.post<ResponseDto>(BACKEND_APIs.transaction, model, { headers: this.headers });
}
