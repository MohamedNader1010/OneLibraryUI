import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GenericService } from '../../shared/services/genericCRUD.service';
import { CommitmentAndDue } from './../interfaces/Icommitment-and-due.interface';
import { CommitmentAndDueTransaction } from '../interfaces/Icommitment-and-due-transaction.interface';
import { ResponseDto } from '../../shared/interfaces/IResponse.dto';

@Injectable({
  providedIn: 'root',
})
export class CommitmentAndDueService extends GenericService<CommitmentAndDue> {
  constructor(http: HttpClient, override _toastrService: ToastrService) {
    super(http, 'CommitmentAndDue', _toastrService);
  }

  AddTransaction = (model: CommitmentAndDueTransaction) => this.http.post<ResponseDto>(`${this.uri}/AddTransaction`, model);

  TotalDues = () => this.http.get<ResponseDto>(`${this.uri}/TotalDues`);

  TotalCommitments = () => this.http.get<ResponseDto>(`${this.uri}/TotalCommitments`);
}
