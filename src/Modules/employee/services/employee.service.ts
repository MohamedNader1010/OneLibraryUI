import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {GenericService} from 'src/Modules/shared/services/genericCRUD.service';
import {_HttpOptions} from 'src/Persistents/consts';
import {Response} from './../../shared/interfaces/Iresponse';
import {Employee} from '../interFaces/Iemployee';

@Injectable({
	providedIn: 'root',
})
export class EmployeeService extends GenericService<Employee, Response> {
	constructor(http: HttpClient) {
		super(http, 'Employee');
	}
}
