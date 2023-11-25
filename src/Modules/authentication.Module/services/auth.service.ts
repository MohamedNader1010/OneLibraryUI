import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { Login } from '../interfaces/Ilogin';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/IAuth';
import { ResetPassword } from '../interfaces/IResetPassword';
import { UpdatePassword } from '../interfaces/IUpdatePassword';
import { User } from '../interfaces/IUser';
import { ResponseDto } from '../../shared/interfaces/IResponse.dto';
import { Router } from '@angular/router';

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
    return this._http.post<ResponseDto>(`${this.uri}LogIn`, login).pipe(shareReplay());
  }
  forgetPassword(email: string) {
    return this._http.post<ResponseDto>(`${this.uri}ForgetPassword?email=${email}`, null);
  }
  resetPassword(model: ResetPassword) {
    return this._http.post<ResponseDto>(`${this.uri}ResetPassword`, model);
  }
  changePassword(id: string, model: UpdatePassword) {
    return this._http.put<ResponseDto>(`${this.uri}changePassword?id=${id}`, model);
  }
  confirmEmail(userId: string, token: string) {
    return this._http.get<ResponseDto>(`${this.uri}confirmEmail`, { params: { userid: userId, token: token } });
  }
  getUserById(userId: string) {
    return this._http.get<ResponseDto>(`${this.uri}Profile`, { params: { id: userId } });
  }
  UpdateUser(userId: string, model: User) {
    return this._http.put<ResponseDto>(`${this.uri}?id=${userId}`, model);
  }

  public setLocalStorage(auth: Auth) {
    localStorage.setItem('token', auth.token);
    localStorage.setItem('uname', auth.username);
    localStorage.setItem('uid', auth.id);
    localStorage.setItem('iSCheckedIn', auth.isCheckedIn.toString());
  }

  public clearLocalStorage() {
    localStorage.clear();
  }

  public logout() {
    this.clearLocalStorage();
    this.username.next(null);
    this._router.navigate(['/auth/login'], {
      queryParams: { returnUrl: this._router.routerState.snapshot.url },
    });
  }
}
