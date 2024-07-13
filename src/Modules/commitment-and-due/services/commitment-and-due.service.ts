import { Injectable } from '@angular/core';
import { GenericService } from '../../shared/services/genericCRUD.service';
import { CommitmentAndDue } from './../interfaces/Icommitment-and-due.interface';
import { CommitmentAndDueTransaction } from '../interfaces/Icommitment-and-due-transaction.interface';
import { ResponseDto } from '../../shared/interfaces/IResponse.dto';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommitmentAndDueService extends GenericService<CommitmentAndDue> {
  override controller = 'CommitmentAndDue';
  override uri: string = `${environment.apiUrl}${this.controller}`;

  AddTransaction = (model: CommitmentAndDueTransaction) => this.httpClient.post<ResponseDto>(`${this.uri}/AddTransaction`, model);

  TotalDues = () => this.httpClient.get<ResponseDto>(`${this.uri}/TotalDues`);

  TotalCommitments = () => this.httpClient.get<ResponseDto>(`${this.uri}/TotalCommitments`);
}
