import { Injectable } from '@angular/core';
import { GenericService } from 'src/Modules/shared/services/genericCRUD.service';
import { IncomeOutcome } from '../interfaces/Iincome-outcome';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MoneyTransactionService extends GenericService<IncomeOutcome> {
  override controller = 'Transaction';
  override uri: string = `${environment.apiUrl}${this.controller}`;
}
