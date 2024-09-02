import { Injectable } from '@angular/core';
import { ResponseDto } from '../../../shared/interfaces/response.dto';
import { Bank } from '../models/bank/Ibank';
import { BaseHttpClient } from '../../../shared/classes/base-http-client.abstract';
import { BACKEND_APIs } from '../apis/backend-apis';
import { finalize, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BankService extends BaseHttpClient {
  GetById = (id: number) => this.httpClient.get<ResponseDto>(BACKEND_APIs.BankById(id), { headers: this.headers });

  getAllBankTransactions(id: number) {
    this.loadingData.next(true);
    this.GetById(id)
      .pipe(
        finalize(() => this.loadingData.next(false)),
        map((data) => ({ body: (data.body as Bank)?.transactions } as ResponseDto)),
      )
      .subscribe({
        next: (data: ResponseDto) => {
          this.dataChange.next(data);
        },
      });
  }

  SetStartingBalance = (model: Bank) => this.httpClient.post<ResponseDto>(BACKEND_APIs.bankStartingBalance, model, { headers: this.headers });
}
