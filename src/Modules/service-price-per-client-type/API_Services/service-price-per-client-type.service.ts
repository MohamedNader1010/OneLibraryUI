import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class ServicePricePerClientTypeService {
	constructor(private _http: HttpClient) {}

	uri: string = `${environment.apiUrl}ServicePricePerClientType/`;
	getAll = () => this._http.get<ServicePricePerClientTypeService[]>(`${this.uri}`);

	delete = (id: number) => this._http.delete<ServicePricePerClientTypeService>(`${this.uri}?Id=${id}`);
}
