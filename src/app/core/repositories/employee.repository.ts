import { Injectable } from '@angular/core';
import { BaseApiRepository } from './common/base-api.repository';
import { BACKEND_APIs } from '../apis/backend-apis';
import { IApiResponseT } from '../Common/models/response/api-response-t.interface';
import { IEmployeeDTO } from '../models/Employees/dtos/employee-dto.interface';
import { Observable } from 'rxjs';
import { ICreateEmployeeCommand } from '../models/Employees/commands/create-employee-command.interface';
import { IUpdateEmployeeCommand } from '../models/Employees/commands/update-employee-command.interface';
import { IActivateCommand } from './../models/Employees/commands/activate-command.interface';
import { IDeactivateCommand } from '../models/Employees/commands/deactivate-command.interface';

@Injectable({ providedIn: 'root' })
export class EmployeeRepository extends BaseApiRepository {
    getAll = (): Observable<IApiResponseT<IEmployeeDTO[]>> =>
        this.get<IApiResponseT<IEmployeeDTO[]>>(BACKEND_APIs.employees.root);

    add = (command: ICreateEmployeeCommand): Observable<IApiResponseT<any>> =>
        this.post<IApiResponseT<any>>(BACKEND_APIs.employees.root, command);

    edit = (command: IUpdateEmployeeCommand): Observable<IApiResponseT<any>> =>
        this.put<IApiResponseT<any>>(BACKEND_APIs.employees.root, command);

    activate = (command: IActivateCommand): Observable<IApiResponseT<any>> =>
        this.post<IApiResponseT<any>>(BACKEND_APIs.employees.activate(command.id), command);

    deactivate = (command: IDeactivateCommand): Observable<IApiResponseT<any>> =>
        this.post<IApiResponseT<any>>(BACKEND_APIs.employees.deactivate(command.id), command);
}
