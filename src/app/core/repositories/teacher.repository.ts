import { Injectable } from '@angular/core';
import { BaseApiRepository } from './common/base-api.repository';
import { BACKEND_APIs } from '../apis/backend-apis';
import { IPagedResponse } from '../Common/models/response/paged-response.interface';
import { IApiResponseT } from '../Common/models/response/api-response-t.interface';
import { Observable } from 'rxjs';
import { IGetAllTeachersOverviewQuery } from '../models/Teachers/queries/get-all-teachers-overview-query.interface';
import { ITeacherOverviewDTO } from '../models/Teachers/dtos/teacher-overview-dto.interface';
import { ICreateTeacherCommand } from '../models/Teachers/commands/create-teacher-command.interface';
import { IUpdateTeacherCommand } from '../models/Teachers/commands/update-teacher-command.interface';
import { ITeacherFullDTO } from '../models/Teachers/dtos/teacher-full-dto.interface';
import { IGetTeacherByIdQuery } from '../models/Teachers/queries/get-teacher-by-id.interface';

@Injectable({ providedIn: 'root' })
export class TeacherRepository extends BaseApiRepository {
    getAllPaginated = (query: IGetAllTeachersOverviewQuery): Observable<IPagedResponse<ITeacherOverviewDTO>> =>
        this.getPaginated<IPagedResponse<ITeacherOverviewDTO>>(BACKEND_APIs.teachers.root, query);

    getById = (query: IGetTeacherByIdQuery): Observable<IApiResponseT<ITeacherFullDTO>> =>
        this.get<IApiResponseT<ITeacherFullDTO>>(BACKEND_APIs.teachers.getById(query.id));

    add = (command: ICreateTeacherCommand): Observable<IApiResponseT<any>> =>
        this.post<IApiResponseT<any>>(BACKEND_APIs.teachers.root, command);

    edit = (command: IUpdateTeacherCommand): Observable<IApiResponseT<any>> =>
        this.put<IApiResponseT<any>>(BACKEND_APIs.teachers.root, command);
}
