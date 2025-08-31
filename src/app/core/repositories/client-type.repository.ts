import { Injectable } from '@angular/core';
import { BaseApiRepository } from './common/base-api.repository';
import { Observable } from 'rxjs';
import { BACKEND_APIs } from '../apis/backend-apis';
import { IApiResponseT } from '../Common/models/response/api-response-t.interface';
import { IClientTypeDTO } from '../models/ClientTypes/dtos/client-type-dto.interface';
import { ICreateClientTypeCommand } from '../models/ClientTypes/commands/create-client-type-command.interface';

@Injectable({ providedIn: 'root' })
export class ClientTypeRepository extends BaseApiRepository {
    getAll = (): Observable<IApiResponseT<IClientTypeDTO[]>> =>
        this.get<IApiResponseT<IClientTypeDTO[]>>(BACKEND_APIs.clientTypes.root);

    add = (command: ICreateClientTypeCommand): Observable<IApiResponseT<any>> =>
        this.post<IApiResponseT<any>>(BACKEND_APIs.clientTypes.root, command);

    edit = (command: ICreateClientTypeCommand): Observable<IApiResponseT<any>> =>
        this.put<IApiResponseT<any>>(BACKEND_APIs.clientTypes.root, command);
}
