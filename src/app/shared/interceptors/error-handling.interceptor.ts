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
        // Handle 401 Unauthorized errors
        if (error.status === 401) {
          return this.handle401Error();
        }
        // Handle client-side errors
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Client-side error: ${error.error.message}`;
        }
        // Handle server-side errors with a response body
        else if (error.error && typeof error.error === 'object') {
          errorMessage = error.error.Message ?? errorMessage;
        }
        // Handle server-side errors with a string response
        else if (typeof error.error === 'string') {
          errorMessage = error.error;
        }
        // Handle other types of errors
        else {
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        // Display error message
        this._toastrService.error(errorMessage);
        // Propagate error
        return throwError(() => new Error(errorMessage));
      }),
    );
  }

  private handle401Error(): Observable<never> {
    // Handle unauthorized errors (e.g., redirect to login)
    this._authService.logout();
    // Display error message for unauthorized access
    this._toastrService.error('Unauthorized, please log in again.');
    // Return an error observable to prevent further processing
    return throwError(() => new Error('Unauthorized, please log in again.'));
  }
}
