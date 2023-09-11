import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { GenericService } from "../../shared/services/genericCRUD.service";
import { ResponseDto } from '../../shared/interfaces/Iresponse';
import { Bank } from '../interfaces/Ibank';

@Injectable({
  providedIn: 'root',
})
export class BankService extends GenericService<Bank> {
  constructor(http: HttpClient, override _toastrService: ToastrService) {
    super(http, 'Bank', _toastrService);
  }
  getAllBankTransactions(id: number) {
    this.loadingData.next(true);
    this.GetById(id).subscribe({
      next: (data: ResponseDto) => {
        this.dataChange.next({ body: (data.body as Bank)?.transactions } as ResponseDto);
      },
      error: (e) => {
        this.loadingData.next(false);
        let res: ResponseDto = e.error ?? e;
        this._toastrService.error(res.message);
      },
      complete: () => this.loadingData.next(false),
    });
  }

  SetStartingPalance = (model: Bank) => this.http.post<ResponseDto>(`${this.uri}/SetStartingPalance`, model, { headers: this.headers });
}
