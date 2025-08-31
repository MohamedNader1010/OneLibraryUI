import { Injectable, inject } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { extractErrorInfo, isLoginRequest, isLogoutRequest, isRefreshTokenRequest } from './token-interceptor.utils';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    private readonly toastr = inject(ToastrService);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    return throwError(() => error);
                }

                if (isLoginRequest(req) || isLogoutRequest(req) || isRefreshTokenRequest(req)) {
                    return throwError(() => error);
                }

                const { errorMessage, errorTitle } = extractErrorInfo(error);
                this.toastr.error(errorMessage, errorTitle);
                return throwError(() => error);
            })
        );
    }
}
