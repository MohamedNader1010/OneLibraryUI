import { Injectable } from '@angular/core';
import { BaseHttpClient } from '../../../shared/classes/base-http-client.abstract';
import { ResponseDto } from '../../../shared/interfaces/response.dto';
import { BACKEND_APIs } from '../apis/backend-apis';
import { Transaction } from '../models/money-transaction/Iincome-outcome';

@Injectable({
  providedIn: 'root',
})
export class MoneyTransactionService extends BaseHttpClient {
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

  add = (model: Transaction) => this.httpClient.post<ResponseDto>(BACKEND_APIs.transaction, model, { headers: this.headers });
}
