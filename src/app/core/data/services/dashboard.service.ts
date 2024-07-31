import { Injectable } from '@angular/core';
import { ResponseDto } from '../../../shared/interfaces/response.dto';
import { BaseHttpClient } from '../../../shared/classes/base-http-client.abstract';
import { BACKEND_APIs } from '../apis/backend-apis';
import { IDashboardStatistics } from '../models/dashboard/dashboard-statistics.interface';
import { IGenericResponseDto } from '../../../shared/interfaces/generic-response.interface';

@Injectable({
  providedIn: 'root',
})
export class DashboardService extends BaseHttpClient {
  getDashboardData() {
    return this.httpClient.get<ResponseDto>(BACKEND_APIs.dashboard);
  }

  getStatistics() {
    return this.httpClient.get<IGenericResponseDto<IDashboardStatistics>>(BACKEND_APIs.dashboardStatistics);
  }
}
