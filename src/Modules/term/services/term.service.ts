import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {Term} from '../interFaces/Iterm';

@Injectable({
	providedIn: 'root',
})
export class TermService {
	constructor(private http: HttpClient) {}
	uri: string = `${environment.apiUrl}Term/`;
	getAll = () => this.http.get<Term[]>(`${this.uri}`);
	add = (serviceType: Term) => this.http.post<Term>(`${this.uri}`, serviceType);
	update = (id: number, serviceType: Term) => this.http.put<Term>(`${this.uri}?id=${id}`, {...serviceType, id});
	getOne = (id: number) => this.http.get<Term>(`${this.uri}?id=${id}`);
	delete = (id: number) => this.http.delete<Term>(`${this.uri}?id=${id}`);
}
