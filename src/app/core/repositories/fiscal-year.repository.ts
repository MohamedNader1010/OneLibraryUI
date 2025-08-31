import { Injectable } from '@angular/core';
import { BaseApiRepository } from './common/base-api.repository';
import { Observable } from 'rxjs';
import { IApiResponseT } from '../Common/models/response/api-response-t.interface';
import { BACKEND_APIs } from '../apis/backend-apis';
import { IFiscalYearDTO } from '../models/FiscalYears/dtos/fiscal-year-dto.interface';
import { IGetAllFiscalYearsOverviewQuery } from '../models/FiscalYears/queries/get-all-fiscal-years-overview-query.interface';
import { IGetCurrentFiscalYearQuery } from '../models/FiscalYears/queries/get-current-fiscal-year-query.interface';
import { IGetFiscalYearByIdQuery } from '../models/FiscalYears/queries/get-fiscal-year-by-id-query.interface';
import { ICreateFiscalYearCommand } from '../models/FiscalYears/commands/create-fiscal-year-command.interface';

@Injectable({ providedIn: 'root' })
export class FiscalYearRepository extends BaseApiRepository {
    getAll = (query: IGetAllFiscalYearsOverviewQuery): Observable<IApiResponseT<IFiscalYearDTO[]>> =>
        this.get<IApiResponseT<IFiscalYearDTO[]>>(BACKEND_APIs.fiscalYears.root);

    getCurrent = (query: IGetCurrentFiscalYearQuery): Observable<IApiResponseT<IFiscalYearDTO>> =>
        this.get<IApiResponseT<IFiscalYearDTO>>(BACKEND_APIs.fiscalYears.current());

    getById = (query: IGetFiscalYearByIdQuery): Observable<IApiResponseT<IFiscalYearDTO>> =>
        this.get<IApiResponseT<IFiscalYearDTO>>(BACKEND_APIs.fiscalYears.getById(query.id));

    add = (command: ICreateFiscalYearCommand): Observable<IApiResponseT<any>> =>
        this.post<IApiResponseT<any>>(BACKEND_APIs.fiscalYears.root, command);
}
