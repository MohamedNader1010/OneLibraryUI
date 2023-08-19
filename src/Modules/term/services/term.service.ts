import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {Term} from '../interFaces/Iterm';

@Injectable({
  providedIn: 'root',
})
export class TermService {
  constructor(private http: HttpClient) {}
  uri: string = `${environment.apiUrl}Term/`;
  getAll = () => this.http.get<Term[]>(`${this.uri}`);
}
