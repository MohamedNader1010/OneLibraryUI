import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {Stage} from '../interFaces/Istage';

@Injectable({
  providedIn: 'root',
})
export class StageService {
  constructor(private _http: HttpClient) {}
  uri: string = `${environment.apiUrl}Stage/`;
  getAll = () => this._http.get<Stage[]>(`${this.uri}`);
}
