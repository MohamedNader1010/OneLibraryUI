import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "src/environments/environment";
import {_HttpOptions} from "src/Persistents/consts";
import {ClientType} from "../interFaces/IclientType";

@Injectable({
	providedIn: "root",
})
export class ClientTypeService {
	constructor(private http: HttpClient) {}
	uri: string = `${environment.apiUrl}ClientType/`;
	getAll = () => this.http.get<ClientType[]>(`${this.uri}GetClientTypes`);
	getOne = (id: number) => this.http.get<ClientType>(`${this.uri}GetClientTypesById/GetById/${id}`);
	add = (clientType: ClientType) => this.http.post<ClientType>(`${this.uri}AddClientType`, clientType, _HttpOptions);
	update = (id: number, clientType: ClientType) => this.http.put<ClientType>(`${this.uri}EditClientType/${id}`, {...clientType, id}, _HttpOptions);
	delete = (id: number) => this.http.delete<ClientType>(`${this.uri}DeleteClientType?id=${id}`, _HttpOptions);
}
