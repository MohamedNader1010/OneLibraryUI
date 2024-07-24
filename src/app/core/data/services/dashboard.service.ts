import { Injectable } from '@angular/core';
import { ResponseDto } from '../../../shared/interfaces/IResponse.dto';
import { BaseHttpClient } from '../../../shared/classes/base-http-client.abstract';
import { BACKEND_APIs } from '../apis/backend-apis';

@Injectable({
  providedIn: 'root',
})
export class DashboardService extends BaseHttpClient {
  getDashboardData() {
    return this.httpClient.get<ResponseDto>(BACKEND_APIs.dashboard);
  }
}
