import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, of, shareReplay, tap} from 'rxjs';
import {Login} from '../interfaces/Ilogin';
import {environment} from 'src/environments/environment';
import {Auth} from '../interfaces/IAuth';
import {ResetPassword} from '../interfaces/IResetPassword';
import {UpdatePassword} from '../interfaces/IUpdatePassword';
import {User} from '../interfaces/IUser';
import {Response} from './../../shared/interfaces/Iresponse';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLogged: boolean = !!localStorage.getItem('token');
  public username: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(private _router: Router, private _http: HttpClient) {
    this.isLogged = !!localStorage.getItem('token');
  }
  uri: string = `${environment.apiUrl}Authorzation/`;
  login(login: Login) {
    return this._http.post<Response>(`${this.uri}LogIn`, login).pipe(shareReplay());
  }
  forgetPassword(email: string) {
    return this._http.post<Response>(`${this.uri}ForgetPassword?email=${email}`, null);
  }
  resetPassword(model: ResetPassword) {
    return this._http.post<Response>(`${this.uri}ResetPassword`, model);
  }
  changePassword(id: string, model: UpdatePassword) {
    return this._http.put<Response>(`${this.uri}changePassword?id=${id}`, model);
  }
  confirmEmail(userId: string, token: string) {
    return this._http.get<Response>(`${this.uri}confirmEmail`, { params: { userid: userId, token: token } });
  }
  getUserById(userId: string) {
    return this._http.get<Response>(`${this.uri}Profile`, { params: { id: userId } });
  }
  UpdateUser(userId: string, model: User) {
    return this._http.put<Response>(`${this.uri}?id=${userId}`, model);
  }
  refreshToken() {
    return this._http.post<Response>(`${this.uri}refreshToken`, { token: localStorage.getItem('refreshToken') });
  }
  public setLocalStorage(auth: Auth) {
    localStorage.setItem('token', auth.token);
    localStorage.setItem('refreshToken', auth.refreshToken);
    localStorage.setItem('refreshTokenExp', auth.refreshTokenExpiration.toString());
    localStorage.setItem('uname', auth.username);
    localStorage.setItem('uid', auth.id);
    localStorage.setItem('iSCheckedIn', auth.isCheckedIn.toString());
  }
  public clearLocalStorage() {
    localStorage.clear();
  }

  public logout() {
    this.clearLocalStorage();
    this._router.navigate(['/auth/login']);
  }
}
