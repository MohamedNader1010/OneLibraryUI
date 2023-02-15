import {_HttpOptions} from './../../../Persistents/consts';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, of, shareReplay, tap} from 'rxjs';
import {Login} from '../interfaces/Ilogin';
import {environment} from 'src/environments/environment';
import {Auth} from '../interfaces/IAuth';
import {Register} from '../interfaces/IRegister';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	public isLogged: boolean = !!localStorage.getItem('token');
	public username: string | null = localStorage.getItem('uname');
	constructor(private http: HttpClient) {}
	login(login: Login) {
		return this.http.post<Auth>(`${environment.apiUrl}Authorzation/LogIn`, login).pipe(shareReplay());
	}
	register(reister: Register) {
		return this.http.post<Auth>(`${environment.apiUrl}Authorzation/register`, reister).pipe(shareReplay());
	}
	confirmEmail(userId: string, token: string) {
		return this.http.get<Auth>(`${environment.apiUrl}Authorzation/confirmEmail`, {params: {userid: userId, token: token}});
	}
	refreshToken() {
		return this.http.post<Auth>(`${environment.apiUrl}Authorzation/refreshToken`, {token: localStorage.getItem('refreshToken')}).pipe(
			catchError(() => {
				this.username = null;
				localStorage.removeItem('token');
				localStorage.removeItem('refreshToken');
				localStorage.removeItem('uname');
				return of(false);
			})
		);
	}
}
