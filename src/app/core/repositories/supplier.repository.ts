import { Injectable } from '@angular/core';
import { BaseApiRepository } from './common/base-api.repository';
import { BACKEND_APIs } from '../apis/backend-apis';
import { IApiResponseT } from '../Common/models/response/api-response-t.interface';
import { Observable } from 'rxjs';
import { ICreateSupplierCommand } from '../models/Suppliers/commands/create-supplier-command.interface';
import { IUpdateSupplierCommand } from '../models/Suppliers/commands/update-supplier-command.interface';
import { ISupplierOverviewDTO } from '../models/Suppliers/dtos/supplier-overview-dto.interface';

@Injectable({ providedIn: 'root' })
export class SupplierRepository extends BaseApiRepository {
    getAll = (): Observable<IApiResponseT<ISupplierOverviewDTO[]>> =>
        this.get<IApiResponseT<ISupplierOverviewDTO[]>>(BACKEND_APIs.suppliers.root);

    add = (command: ICreateSupplierCommand): Observable<IApiResponseT<any>> =>
        this.post<IApiResponseT<any>>(BACKEND_APIs.suppliers.root, command);

    edit = (command: IUpdateSupplierCommand): Observable<IApiResponseT<any>> =>
        this.put<IApiResponseT<any>>(BACKEND_APIs.suppliers.root, command);
}
