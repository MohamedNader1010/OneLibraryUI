import { Injectable } from '@angular/core';
import { BaseApiRepository } from './common/base-api.repository';
import { BACKEND_APIs } from '../apis/backend-apis';
import { IApiResponseT } from '../Common/models/response/api-response-t.interface';
import { IServiceTypeDTO } from '../models/ServiceTypes/dtos/service-type-dto.interface';
import { IGetAllServiceTypesQuery } from '../models/ServiceTypes/queries/get-all-service-types-query.interface';
import { ICreateServiceTypeCommand } from '../models/ServiceTypes/commands/create-service-type-command.interface';
import { IUpdateServiceTypeCommand } from '../models/ServiceTypes/commands/update-service-type-command.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ServiceTypeRepository extends BaseApiRepository {
    getAll = (query?: IGetAllServiceTypesQuery): Observable<IApiResponseT<IServiceTypeDTO[]>> =>
        this.get<IApiResponseT<IServiceTypeDTO[]>>(BACKEND_APIs.serviceTypes.root);

    add = (command: ICreateServiceTypeCommand): Observable<IApiResponseT<any>> =>
        this.post<IApiResponseT<any>>(BACKEND_APIs.serviceTypes.root, command);

    edit = (command: IUpdateServiceTypeCommand): Observable<IApiResponseT<any>> =>
        this.put<IApiResponseT<any>>(BACKEND_APIs.serviceTypes.root, command);
}
