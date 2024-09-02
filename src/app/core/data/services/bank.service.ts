import { Injectable } from '@angular/core';
import { ResponseDto } from '../../../shared/interfaces/response.dto';
import { Bank } from '../models/bank/Ibank';
import { BaseHttpClient } from '../../../shared/classes/base-http-client.abstract';
import { BACKEND_APIs } from '../apis/backend-apis';
import { IGenericResponseDto } from '../../../shared/interfaces/generic-response.interface';

@Injectable({
  providedIn: 'root',
})
export class BankService extends BaseHttpClient {
  GetStatisticsById = (id: number) => this.httpClient.get<IGenericResponseDto<Bank>>(BACKEND_APIs.statisticsById(id), { headers: this.headers });

  SetStartingBalance = (model: Bank) => this.httpClient.post<ResponseDto>(BACKEND_APIs.bankStartingBalance, model, { headers: this.headers });
}
