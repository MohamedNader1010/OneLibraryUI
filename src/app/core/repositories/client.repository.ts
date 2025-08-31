import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { BaseApiRepository } from './common/base-api.repository';
import { BACKEND_APIs } from '../apis/backend-apis';
import { IPagedResponse } from '../Common/models/response/paged-response.interface';
import { IClientOverviewDTO } from '../models/Clients/dtos/client-overview-dto.interface';
import { IApiResponseT } from '../Common/models/response/api-response-t.interface';
import { IGetAllClientsOverviewByClientTypeQuery } from '../models/Clients/queries/get-all-clients-overview-by-client-type-query.interface';
import { IPayBulkOrdersCommand } from '../models/Clients/commands/pay-bulk-orders-command.interface';
import { Observable } from 'rxjs';
import { ICreateClientCommand } from '../models/Clients/commands/create-client-command.interface';
import { IUpdateClientCommand } from '../models/Clients/commands/update-client-command.interface';
import { IGetAllClientsOverviewQuery } from '../models/Clients/queries/get-all-clients-overview-query.interface';
import { IGetClientByIdQuery } from '../models/Clients/queries/get-client-by-id.interface';
import { IClientFullDTO } from '../models/Clients/dtos/client-full-dto.interface';

@Injectable({ providedIn: 'root' })
export class ClientRepository extends BaseApiRepository {
    getAllPaginated = (query: IGetAllClientsOverviewQuery): Observable<IPagedResponse<IClientOverviewDTO>> =>
        this.getPaginated<IPagedResponse<IClientOverviewDTO>>(BACKEND_APIs.clients.root, query);

    getById = (query: IGetClientByIdQuery): Observable<IApiResponseT<IClientFullDTO>> =>
        this.get<IApiResponseT<IClientFullDTO>>(BACKEND_APIs.clients.getById(query.id));

    add = (command: ICreateClientCommand): Observable<IApiResponseT<any>> =>
        this.post<IApiResponseT<any>>(BACKEND_APIs.clients.root, command);

    edit = (command: IUpdateClientCommand): Observable<IApiResponseT<any>> =>
        this.put<IApiResponseT<any>>(BACKEND_APIs.clients.root, command);

    getAllByType = (query: IGetAllClientsOverviewByClientTypeQuery): Observable<IApiResponseT<IClientOverviewDTO[]>> =>
        this.get<IApiResponseT<IClientOverviewDTO[]>>(
            `${BACKEND_APIs.clients.getByClientTypeId(query.id)}`,
            new HttpParams().set('queryFilter', query.queryFilter)
        );

    bulkPayment = (command: IPayBulkOrdersCommand): Observable<IApiResponseT<any>> =>
        this.post<IApiResponseT<any>>(BACKEND_APIs.clients.payBulk(), command);
}
