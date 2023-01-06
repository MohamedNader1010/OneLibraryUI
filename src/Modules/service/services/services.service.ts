import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "src/environments/environment";
import {_HttpOptions} from "src/Persistents/consts";
import {Service} from "../interfaces/Iservice";

@Injectable({
	providedIn: "root",
})
export class ServicesService {
	constructor(private http: HttpClient) {}
	uri: string = `${environment.apiUrl}Service/`;
	getAll = () => this.http.get<Service[]>(`${this.uri}`);
	add = (service: Service) => this.http.post<Service>(`${this.uri}AddService`, service, _HttpOptions);
	getOne = (id: number) => this.http.get<Service>(`${environment.apiUrl}/GetById?Id=${id}`);
	update = (id: number, service: Service) => this.http.put<Service>(`${this.uri}?Id=${id}`, {...service, id}, _HttpOptions);
	delete = (id: number) => this.http.delete<Service>(`${this.uri}?Id=${id}`, _HttpOptions);
}
