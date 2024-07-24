import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { Login } from '../interfaces/Ilogin';
import { Auth } from '../interfaces/IAuth';
import { ResetPassword } from '../interfaces/IResetPassword';
import { UpdatePassword } from '../interfaces/IUpdatePassword';
import { User } from '../interfaces/IUser';
import { Router } from '@angular/router';
import { ResponseDto } from '../../../shared/interfaces/IResponse.dto';
import { BACKEND_APIs } from '../../data/apis/backend-apis';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLogged: boolean = !!localStorage.getItem('token');
  public username: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private _router: Router, private _http: HttpClient) {
    this.isLogged = !!localStorage.getItem('token');
  }

  login(login: Login) {
    return this._http.post<ResponseDto>(BACKEND_APIs.login, login).pipe(shareReplay());
  }
  forgetPassword(email: string) {
    return this._http.post<ResponseDto>(`${BACKEND_APIs.forgetPassword}?email=${email}`, null);
  }
  resetPassword(model: ResetPassword) {
    return this._http.post<ResponseDto>(BACKEND_APIs.resetPassword, model);
  }
  changePassword(id: string, model: UpdatePassword) {
    return this._http.put<ResponseDto>(`${BACKEND_APIs.changePassword}?id=${id}`, model);
  }
  confirmEmail(userId: string, token: string) {
    return this._http.get<ResponseDto>(BACKEND_APIs.confirmEmail, { params: { userid: userId, token: token } });
  }
  getUserById(userId: string) {
    return this._http.get<ResponseDto>(BACKEND_APIs.profile, { params: { id: userId } });
  }
  UpdateUser(userId: string, model: User) {
    return this._http.put<ResponseDto>(`${BACKEND_APIs.profile}?id=${userId}`, model);
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
