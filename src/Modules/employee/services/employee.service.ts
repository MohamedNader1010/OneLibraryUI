import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {GenericService} from 'src/Modules/shared/services/genericCRUD.service';
import {Response} from './../../shared/interfaces/Iresponse';
import {Employee} from '../interFaces/Iemployee';

@Injectable({
	providedIn: 'root',
})
export class EmployeeService extends GenericService<Employee> {
	constructor(http: HttpClient) {
		super(http, 'Employee');
	}
}
