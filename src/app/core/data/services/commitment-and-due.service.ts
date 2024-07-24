import { Injectable } from '@angular/core';
import { ResponseDto } from '../../../shared/interfaces/IResponse.dto';
import { CommitmentAndDueTransaction } from '../models/commitment-and-due/Icommitment-and-due-transaction.interface';
import { BaseHttpClient } from '../../../shared/classes/base-http-client.abstract';
import { BACKEND_APIs } from '../apis/backend-apis';
import { CommitmentAndDue } from '../models/commitment-and-due/Icommitment-and-due.interface';

@Injectable({
  providedIn: 'root',
})
export class CommitmentAndDueService extends BaseHttpClient {
  getAll = () => this.httpClient.get<ResponseDto>(BACKEND_APIs.commitmentAndDue, { headers: this.headers });

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
  add = (model: CommitmentAndDue) => this.httpClient.post<ResponseDto>(BACKEND_APIs.commitmentAndDue, model, { headers: this.headers });

  update = (id: number, model: CommitmentAndDue) => this.httpClient.put<ResponseDto>(BACKEND_APIs.commitmentAndDue, { ...model, id }, { headers: this.headers });

  AddTransaction = (model: CommitmentAndDueTransaction) => this.httpClient.post<ResponseDto>(BACKEND_APIs.commitmentAndDueTransaction, model);

  TotalDues = () => this.httpClient.get<ResponseDto>(BACKEND_APIs.duesTotal);

  TotalCommitments = () => this.httpClient.get<ResponseDto>(BACKEND_APIs.commitmentTotal);
}
