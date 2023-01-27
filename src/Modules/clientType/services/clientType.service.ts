import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {ClientType} from '../interFaces/IclientType';

@Injectable({
	providedIn: 'root',
})
export class ClientTypeService {
	constructor(private http: HttpClient) {}
	uri: string = `${environment.apiUrl}ClientType`;
	getAll = () => this.http.get<ClientType[]>(`${this.uri}`);
	getOne = (id: number) => this.http.get<ClientType[]>(`${this.uri}?id=${id}`);
	add = (clientType: ClientType) => this.http.post<ClientType>(`${this.uri}`, clientType, _HttpOptions);
	update = (id: number, clientType: ClientType) => this.http.put<ClientType>(`${this.uri}?id=${id}`, {...clientType, id}, _HttpOptions);
	delete = (id: number) => this.http.delete<ClientType>(`${this.uri}?id=${id}`, _HttpOptions);
}
