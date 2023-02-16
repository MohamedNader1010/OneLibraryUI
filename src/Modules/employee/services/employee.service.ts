import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {Response} from 'src/Modules/shared/interfaces/Iresponse';
import {_HttpOptions} from 'src/Persistents/consts';
import {Employee} from '../interFaces/Iemployee';

@Injectable({
	providedIn: 'root',
})
export class EmployeeService {
	constructor(private http: HttpClient) {}
	uri: string = `${environment.apiUrl}Employee/`;
	getAll = () => this.http.get<Response>(`${this.uri}GetEmployee`);
	getOne = (id: string) => this.http.get<Response>(`${this.uri}?id=${id}`);
	add = (employee: Employee) => this.http.post<Response>(`${this.uri}`, employee);
	update = (id: string, Employee: Employee) => this.http.put<Response>(`${this.uri}EditEmployee?id=${id}`, {...Employee, id});
	delete = (id: string) => this.http.delete<Response>(`${this.uri}DeleteEmployee?id=${id}`);
	validateUsername = (username: string) => this.http.get<Response>(`${this.uri}validateUsername?username=${username}`);
	validateEmail = (email: string) => this.http.get<Response>(`${this.uri}validateUsername?email=${email}`);
}
