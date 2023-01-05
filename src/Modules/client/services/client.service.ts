import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "src/environments/environment";
import {_HttpOptions} from "src/Persistents/consts";
import {Client} from "../interFaces/Iclient";

@Injectable({
	providedIn: "root",
})
export class ClientService {
	constructor(private http: HttpClient) {}
	uri: string = `${environment.apiUrl}Client/`;
	getAll = () => this.http.get<Client[]>(`${this.uri}GetClients`);
	getOne = (id: number) => this.http.get<Client>(`${this.uri}GetClientsById/GetById/${id}`);
	add = (client: Client) => this.http.post<Client>(`${this.uri}AddClient`, client, _HttpOptions);
	update = (id: number, Client: Client) => this.http.put<Client>(`${this.uri}EditClient/${id}`, {...Client, id}, _HttpOptions);
	delete = (id: number) => this.http.delete<Client>(`${this.uri}DeleteClient?id=${id}`, _HttpOptions);
}
