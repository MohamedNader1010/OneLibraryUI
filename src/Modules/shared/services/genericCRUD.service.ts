import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Response } from '../interfaces/Iresponse'
export abstract class GenericService<Tin> {
	constructor(public http: HttpClient, private controller: string) { }

	uri: string = `${environment.apiUrl}${this.controller}`;
	headers = new HttpHeaders({ 'Content-Type': 'application/json' });

	getAll = () => this.http.get<Response>(`${this.uri}`, { headers: this.headers });

	add = (model: Tin) => this.http.post<Response>(`${this.uri}`, model, { headers: this.headers });

	GetById = (id: string | number) => this.http.get<Response>(`${this.uri}/GetById`, { headers: this.headers, params: { id: id } });

	update = (id: string | number, model: Tin) => this.http.put<Response>(`${this.uri}`, { ...model, id }, { headers: this.headers, params: { id: id } });

	delete = (id: string | number) => this.http.delete<Response>(`${this.uri}`, { headers: this.headers, params: { id: id } });
}
