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
	uri: string = `${environment.apiUrl}Authorization/Users`;
	getAll = () => this.http.get<Employee[]>(`${this.uri}`);
	add = (employee: Employee) => this.http.post<Employee>(`${this.uri}`, employee, _HttpOptions);
	update = (id: number, Employee: Employee) => this.http.put<Employee>(`${this.uri}?id=${id}`, {...Employee, id}, _HttpOptions);
	getOne = (id: number) => this.http.get<Employee[]>(`${this.uri}?id=${id}`);
	delete = (id: number) => this.http.delete<Employee>(`${this.uri}?id=${id}`, _HttpOptions);
}
