import { Injectable } from '@angular/core';
import { BaseHttpClient } from '../../../shared/classes/base-http-client.abstract';
import { BACKEND_APIs } from '../apis/backend-apis';
import { ResponseDto } from '../../../shared/interfaces/response.dto';

@Injectable({
  providedIn: 'root',
})
export class FiscalYearsService extends BaseHttpClient {
  getAllFiscalYears() {
    return this.httpClient.get<ResponseDto>(BACKEND_APIs.fiscalYear);
  }
}
