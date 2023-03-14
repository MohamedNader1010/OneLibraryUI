import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from 'src/environments/environment';

export abstract class GenericService<T, R> {
	constructor(public http: HttpClient, private controller: string) {}

	uri: string = `${environment.apiUrl}${this.controller}`;
	headers = new HttpHeaders({'Content-Type': 'application/json'});

	getAll = () => this.http.get<R>(`${this.uri}`, {headers: this.headers});

	add = (model: T) => this.http.post<R>(`${this.uri}`, model, {headers: this.headers});

	GetById = (id: string | number) => this.http.get<R>(`${this.uri}/GetById`, {headers: this.headers, params: {id: id}});

	update = (id: string | number, model: T) => this.http.put<R>(`${this.uri}`, {...model, id}, {headers: this.headers, params: {id: id}});

	delete = (id: string | number) => this.http.delete<R>(`${this.uri}`, {headers: this.headers, params: {id: id}});
}
