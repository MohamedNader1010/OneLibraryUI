import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/authentication/services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private _toastrService: ToastrService, private _authService: AuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error();
        } else if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;
        } else if (typeof error.error === 'object') {
          errorMessage = error.error.Message ?? errorMessage;
        } else if (typeof error.error === 'string') {
          errorMessage = error.error;
        } else {
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        this._toastrService.error(errorMessage);
        return throwError(() => new Error(errorMessage));
      }),
    );
  }

  private handle401Error(): Observable<HttpEvent<any>> {
    this._authService.logout();
    return throwError(() => new Error('unauthorized, please login again.'));
  }
}
