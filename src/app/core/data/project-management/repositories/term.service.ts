import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Term } from '../models/Iterm.model';

@Injectable({
  providedIn: 'root',
})
export class TermService {
  constructor(private _http: HttpClient) {}
  uri: string = `${environment.apiUrl}Term/`;
  getAll = () => this._http.get<Term[]>(`${this.uri}`);
}
