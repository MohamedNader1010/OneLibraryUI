import { Injectable } from '@angular/core';
import { BaseApiRepository } from './common/base-api.repository';
import { BACKEND_APIs } from '../apis/backend-apis';
import { IBranchStockDTO } from '../models/BranchStocks/dtos/branch-stock-dto.interface';
import { IApiResponseT } from '../Common/models/response/api-response-t.interface';
import { IGetAllStocksByBranchIdQuery } from '../models/BranchStocks/queries/get-all-stocks-by-branch-id-query.interface';
import { ICreateBranchStockCommand } from '../models/BranchStocks/commands/create-branch-stock-command.interface';
import { Observable } from 'rxjs';
import { IUpdateBranchStockCommand } from '../models/BranchStocks/commands/update-branch-stock-command.interface';

@Injectable({ providedIn: 'root' })
export class BranchStockRepository extends BaseApiRepository {
    getAll = (query: IGetAllStocksByBranchIdQuery): Observable<IApiResponseT<IBranchStockDTO[]>> =>
        this.get<IApiResponseT<IBranchStockDTO[]>>(BACKEND_APIs.materials.root);

    add = (command: ICreateBranchStockCommand): Observable<IApiResponseT<any>> =>
        this.post<IApiResponseT<any>>(BACKEND_APIs.materials.root, command);

    edit = (command: IUpdateBranchStockCommand): Observable<IApiResponseT<any>> =>
        this.put<IApiResponseT<any>>(BACKEND_APIs.materials.root, command);
}
