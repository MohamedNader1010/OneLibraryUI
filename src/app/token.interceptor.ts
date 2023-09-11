import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpInterceptor, HttpErrorResponse, HttpEvent } from "@angular/common/http";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, filter, switchMap, take } from "rxjs/operators";
import { Auth } from "src/Modules/authentication.Module/interfaces/IAuth";
import { AuthService } from "src/Modules/authentication.Module/services/auth.service";
import { Router } from "@angular/router";
import { ResponseDto } from './../Modules/shared/interfaces/Iresponse';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private _isRefreshing = false;
  private _refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private _authService: AuthService, private _router: Router, private _toastrService: ToastrService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
      });
    }
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        } else {
          return throwError(() => error);
        }
      }),
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this._isRefreshing) {
      this._isRefreshing = true;
      this._refreshTokenSubject.next(null);
      return this._authService.refreshToken().pipe(
        catchError((error) => {
          this._toastrService.error(error.message);
          this._authService.clearLocalStorage();
          this._authService.username.next(null);
          this._refreshTokenSubject.next(null);
          this._router.navigate(['/auth/login'], {
            queryParams: { returnUrl: this._router.url },
            queryParamsHandling: 'merge',
          });
          return throwError(() => error);
        }),
        switchMap((res: ResponseDto) => {
          this._isRefreshing = false;
          if (res) {
            const auth: Auth = res.body;
            this._authService.setLocalStorage(auth);
            this._authService.username.next(auth.username);
            this._refreshTokenSubject.next(auth.token);
          } else {
            this._authService.clearLocalStorage();
            this._authService.username.next(null);
            this._refreshTokenSubject.next(null);
            this._router.navigate(['/auth/login'], {
              queryParams: { returnUrl: this._router.routerState.snapshot.url },
            });
          }
          return next.handle(
            request.clone({
              setHeaders: { Authorization: `Bearer ${res.body.token}` },
            }),
          );
        }),
      );
    } else {
      return this._refreshTokenSubject.pipe(
        filter((sub) => sub != null),
        take(1),
        switchMap((token) => next.handle(request.clone({ setHeaders: { Authorization: token } }))),
      );
    }
  }
}
