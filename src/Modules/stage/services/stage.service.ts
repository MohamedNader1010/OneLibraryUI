import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {Stage} from '../interFaces/Istage';

@Injectable({
	providedIn: 'root',
})
export class StageService {
	constructor(private http: HttpClient) {}
	uri: string = `${environment.apiUrl}Stage/`;
	getAll = () => this.http.get<Stage[]>(`${this.uri}`);
	add = (stage: Stage) => this.http.post<Stage>(`${this.uri}`, stage);
	update = (id: number, stage: Stage) => this.http.put<Stage>(`${this.uri}?id=${id}`, {...stage, id});
	getOne = (id: number) => this.http.get<Stage>(`${this.uri}?id=${id}`);
	delete = (id: number) => this.http.delete<Stage>(`${this.uri}?id=${id}`);
}
