import { Injectable } from '@angular/core';
import { BaseApiRepository } from './common/base-api.repository';
import { BACKEND_APIs } from '../apis/backend-apis';
import { IPagedResponse } from '../Common/models/response/paged-response.interface';
import { IServiceDTO } from '../models/services/dtos/service-dto.interface';
import { IApiResponseT } from '../Common/models/response/api-response-t.interface';
import { IServiceOverviewDTO } from '../models/services/dtos/service-overview-dto.interface';
import { IPricedServicesDTO } from '../models/services/dtos/priced-services-dto.interface';
import { IGetAllPricedServicesByClientTypeQuery } from '../models/services/queries/get-all-priced-services-by-client-type-query.interface';
import { ICreateServiceCommand } from '../models/services/commands/create-service-command.interface';
import { IUpdateServiceCommand } from '../models/services/commands/update-service-command.interface';
import { Observable } from 'rxjs';
import { IGetAllServicesOverviewQuery } from '../models/services/queries/get-all-services-overview-query.interface';
import { IGetAllServicesQuery } from '../models/services/queries/get-all-services-query.interface';

@Injectable({ providedIn: 'root' })
export class ServiceRepository extends BaseApiRepository {
    getAllPaginated = (query: IGetAllServicesQuery): Observable<IPagedResponse<IServiceDTO>> =>
        this.getPaginated<IPagedResponse<IServiceDTO>>(BACKEND_APIs.services.root, query);

    getAllOverview = (query: IGetAllServicesOverviewQuery): Observable<IApiResponseT<IServiceOverviewDTO[]>> =>
        this.get<IApiResponseT<IServiceOverviewDTO[]>>(BACKEND_APIs.services.overview());

    getAllPricedByClientTypeId = (
        query: IGetAllPricedServicesByClientTypeQuery
    ): Observable<IApiResponseT<IPricedServicesDTO[]>> =>
        this.get<IApiResponseT<IPricedServicesDTO[]>>(BACKEND_APIs.services.pricedByClientTypeId(query.clientTypeId));

    add = (command: ICreateServiceCommand): Observable<IApiResponseT<any>> =>
        this.post<IApiResponseT<any>>(BACKEND_APIs.services.root, command);

    edit = (command: IUpdateServiceCommand): Observable<IApiResponseT<any>> =>
        this.put<IApiResponseT<any>>(BACKEND_APIs.services.root, command);
}
