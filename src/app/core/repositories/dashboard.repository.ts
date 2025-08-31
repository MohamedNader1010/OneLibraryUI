import { Injectable } from '@angular/core';
import { BaseApiRepository } from './common/base-api.repository';
import { IApiResponseT } from '../Common/models/response/api-response-t.interface';
import { BACKEND_APIs } from '../apis/backend-apis';
import { IDashBoardDataDTO } from '../models/DashBoard/dtos/dashboard-data-dto.interface';
import { IDashboardStatisticsDTO } from '../models/DashBoard/dtos/dashboard-statistics-dto.interface';

@Injectable({ providedIn: 'root' })
export class DashboardRepository extends BaseApiRepository {
    getDashboardData = () => this.get<IApiResponseT<IDashBoardDataDTO>>(BACKEND_APIs.dashboard.root);

    getStatistics = () => this.get<IApiResponseT<IDashboardStatisticsDTO>>(BACKEND_APIs.dashboard.statistics());
}
