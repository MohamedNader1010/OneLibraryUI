import {_HttpOptions} from './../../../Persistents/consts';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {shareReplay} from 'rxjs';
import {Login} from '../interfaces/Ilogin';
import {SharedService} from './../../shared/services/shared.service';
import {environment} from 'src/environments/environment';
import {Auth} from '../interfaces/IAuth';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	public isLogged: boolean = !!localStorage.getItem('token');
	public username: string = localStorage.getItem('uname') ?? '';
	constructor(private http: HttpClient, private data: SharedService) {}
	login(login: Login) {
		return this.http.post<Auth>(`${environment.apiUrl}Authorzation/LogIn`, login, _HttpOptions).pipe(shareReplay());
	}
	refreshToken(token: string) {
		return this.http.get<Auth>(`${environment.apiUrl}Authorzation/refreshToken?refreshToken=${token}`, _HttpOptions);
	}
}
