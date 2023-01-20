import {_HttpOptions} from './../../../Persistents/consts';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {shareReplay} from 'rxjs';
import {Login} from '../interfaces/Ilogin';
import {environment} from 'src/environments/environment';
import {Auth} from '../interfaces/IAuth';
import {Register} from '../interfaces/IRegister';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	public isLogged: boolean = !!localStorage.getItem('token');
	public username: string = localStorage.getItem('uname') ?? '';
	constructor(private http: HttpClient) {}
	login(login: Login) {
		return this.http.post<Auth>(`${environment.apiUrl}Authorzation/LogIn`, login, _HttpOptions).pipe(shareReplay());
	}
	register(reister: Register) {
		return this.http.post<Auth>(`${environment.apiUrl}Authorzation/register`, reister, _HttpOptions).pipe(shareReplay());
	}
	refreshToken() {
		return this.http.get<Auth>(`${environment.apiUrl}Authorzation/refreshToken?t=${localStorage.getItem('refreshToken')}`, _HttpOptions);
	}
}
