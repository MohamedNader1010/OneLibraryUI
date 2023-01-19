import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Material} from '../interfaces/Imaterial';
import {_HttpOptions} from './../../../Persistents/consts';
import {environment} from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class MaterialService {
	constructor(private http: HttpClient) {}
	uri: string = `${environment.apiUrl}Material/`;

	getAll = () => this.http.get<Material[]>(`${this.uri}`);
	getOne = (id: number) => this.http.get<Material>(`${this.uri}${id}?id=`);
	add = (material: Material) => this.http.post<Material>(`${this.uri}`, material, _HttpOptions);
	update = (id: number, material: Material) => this.http.put<Material>(`${this.uri}?id=${id}`, {...material, id}, _HttpOptions);
	delete = (id: number) => this.http.delete<Material>(`${this.uri}?id=${id}`, _HttpOptions);
}
