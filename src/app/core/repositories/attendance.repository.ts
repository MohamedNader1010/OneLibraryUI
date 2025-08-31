import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND_APIs } from '../apis/backend-apis';
import { ICreateAttendanceCommand } from '../models/Attendances/commands/create-attendance-command.interface';
import { IUpdateAttendanceCommand } from '../models/Attendances/commands/update-attendance-command.interface';
import { IAttendanceDTO } from '../models/Attendances/dtos/attendance-dto.interface';
import { IGetAttendanceByShiftQuery } from '../models/Attendances/queries/get-attendance-by-shift-query.interface';
import { IGetAttendanceStateByEmployeeQuery } from '../models/Attendances/queries/get-attendance-state-by-employee-query.interface';
import { BaseApiRepository } from './common/base-api.repository';
import { IApiResponseT } from '../Common/models/response/api-response-t.interface';

@Injectable({ providedIn: 'root' })
export class AttendanceRepository extends BaseApiRepository {
    getAll = (): Observable<IApiResponseT<IAttendanceDTO[]>> =>
        this.get<IApiResponseT<IAttendanceDTO[]>>(BACKEND_APIs.attendances.root);

    getAllByShiftId = (query: IGetAttendanceByShiftQuery): Observable<IApiResponseT<IAttendanceDTO[]>> =>
        this.get<IApiResponseT<IAttendanceDTO[]>>(BACKEND_APIs.attendances.getAllByShiftId(query.id));

    getAttendanceState = (query: IGetAttendanceStateByEmployeeQuery): Observable<IApiResponseT<boolean>> =>
        this.get<IApiResponseT<boolean>>(BACKEND_APIs.attendances.getStateByEmployeeId(query.id));

    add = (command: ICreateAttendanceCommand): Observable<IApiResponseT<any>> =>
        this.post<IApiResponseT<any>>(BACKEND_APIs.attendances.root, command);

    edit = (command: IUpdateAttendanceCommand): Observable<IApiResponseT<any>> =>
        this.put<IApiResponseT<any>>(BACKEND_APIs.attendances.root, command);

    checkIn = (): Observable<IApiResponseT<any>> => this.post<IApiResponseT<any>>(BACKEND_APIs.attendances.checkIn());

    checkOut = (): Observable<IApiResponseT<any>> => this.post<IApiResponseT<any>>(BACKEND_APIs.attendances.checkOut());
}
