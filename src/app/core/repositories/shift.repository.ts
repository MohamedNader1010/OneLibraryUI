import { Injectable } from '@angular/core';
import { BaseApiRepository } from './common/base-api.repository';
import { BACKEND_APIs } from '../apis/backend-apis';
import { IApiResponseT } from '../Common/models/response/api-response-t.interface';
import { IShiftDTO } from '../models/Shifts/dtos/shift-dto.interface';
import { IGetAllShiftsOverviewQuery } from '../models/Shifts/queries/get-all-shifts-overview-query.interface';
import { IGetShiftByIdQuery } from '../models/Shifts/queries/get-shift-by-id-query.interface';
import { IGetCurrentShiftQuery } from '../models/Shifts/queries/get-current-shift-query.interface';
import { ICreateShiftCommand } from '../models/Shifts/commands/create-shift-command.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShiftRepository extends BaseApiRepository {
    getAll = (query?: IGetAllShiftsOverviewQuery): Observable<IApiResponseT<IShiftDTO[]>> =>
        this.get<IApiResponseT<IShiftDTO[]>>(BACKEND_APIs.shifts.root);

    getById = (query: IGetShiftByIdQuery): Observable<IApiResponseT<IShiftDTO>> =>
        this.get<IApiResponseT<IShiftDTO>>(BACKEND_APIs.shifts.getById(query.id));

    getCurrent = (query?: IGetCurrentShiftQuery): Observable<IApiResponseT<IShiftDTO>> =>
        this.get<IApiResponseT<IShiftDTO>>(BACKEND_APIs.shifts.current());

    start = (command: ICreateShiftCommand): Observable<IApiResponseT<any>> =>
        this.post<IApiResponseT<any>>(BACKEND_APIs.shifts.start(), command);
}
