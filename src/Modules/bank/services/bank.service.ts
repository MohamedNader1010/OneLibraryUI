import { Injectable } from '@angular/core';
import { GenericService } from '../../shared/services/genericCRUD.service';
import { ResponseDto } from '../../shared/interfaces/IResponse.dto';
import { Bank } from '../interfaces/Ibank';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BankService extends GenericService<Bank> {
  override controller = 'Bank';
  override uri: string = `${environment.apiUrl}${this.controller}`;

  getAllBankTransactions(id: number) {
    this.loadingData.next(true);
    this.GetById(id).subscribe({
      next: (data: ResponseDto) => {
        this.dataChange.next({ body: (data.body as Bank)?.transactions } as ResponseDto);
      },
      error: () => this.loadingData.next(false),
      complete: () => this.loadingData.next(false),
    });
  }

  SetStartingPalance = (model: Bank) => this.httpClient.post<ResponseDto>(`${this.uri}/SetStartingPalance`, model, { headers: this.headers });
}
