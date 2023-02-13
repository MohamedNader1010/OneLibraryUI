import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {_HttpOptions} from 'src/Persistents/consts';
import {Employee} from '../interFaces/Iemployee';

@Injectable({
	providedIn: 'root',
})
export class EmployeeService {
	constructor(private http: HttpClient) {}
	uri: string = `${environment.apiUrl}Employee/`;
	getAll = () => this.http.get<Employee[]>(`${this.uri}GetEmployee`);
	getOne = (id: string) => this.http.get<Employee[]>(`${this.uri}?id=${id}`);
	add = (employee: Employee) => this.http.post<Employee>(`${this.uri}`, employee);
	update = (id: string, Employee: Employee) => this.http.put<Employee>(`${this.uri}EditEmployee?id=${id}`, {...Employee, id});
	delete = (id: string) => this.http.delete<Employee>(`${this.uri}DeleteEmployee?id=${id}`);
}
