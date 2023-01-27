import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {_HttpOptions} from 'src/Persistents/consts';
import {Client} from '../interFaces/Iclient';

@Injectable({
	providedIn: 'root',
})
export class ClientService {
	constructor(private http: HttpClient) {}
	uri: string = `${environment.apiUrl}Client`;
	getAll = () => this.http.get<Client[]>(`${this.uri}`);
	getAllByType = (id: number) => this.http.get<Client[]>(`${this.uri}/getByClientTypeId?id=${id}`);
	add = (client: Client) => this.http.post<Client>(`${this.uri}`, client);
	getOne = (id: number) => this.http.get<Client[]>(`${this.uri}?Id=${id}`);
	update = (id: number, Client: Client) => this.http.put<Client>(`${this.uri}?Id=${id}`, {...Client, id});
	delete = (id: number) => this.http.delete<Client>(`${this.uri}?Id=${id}`);
}
