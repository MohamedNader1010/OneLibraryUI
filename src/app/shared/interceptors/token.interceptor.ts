import { Injectable, inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, switchMap, take, finalize } from 'rxjs/operators';
import { HeadersKeysConstants } from '../constants/headers-keys.constants';
import { AuthService } from '../../modules/authentication/services/auth.service';
import { isRefreshTokenRequest, isLoginRequest, isLogoutRequest, extractErrorInfo } from './token-interceptor.utils';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    private readonly authService = inject(AuthService);
    private readonly toastr = inject(ToastrService);
    private tokenSubject = new BehaviorSubject<string | null>(null);
    private isRefreshing = false;

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.getAccessToken();
        const isAuthEndpoint = isRefreshTokenRequest(request) || isLoginRequest(request) || isLogoutRequest(request);
        const authenticatedRequest = !isAuthEndpoint && token ? this.addToken(request, token) : request;

        return next
            .handle(authenticatedRequest)
            .pipe(catchError((error: HttpErrorResponse) => this.handle401Error(isAuthEndpoint, error, request, next)));
    }

    private handle401Error(
        isAuthEndpoint: boolean,
        error: HttpErrorResponse,
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const { errorMessage, errorTitle } = extractErrorInfo(error);
        if (isAuthEndpoint) {
            this.toastr.error(errorMessage, errorTitle);
            return throwError(() => error);
        }

        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.tokenSubject.next(null);

            return this.authService.refreshToken().pipe(
                switchMap((response) => {
                    const newToken = response?.data?.tokens?.accessToken;
                    if (!newToken) {
                        this.authService.logout();
                        return throwError(() => new Error('No token in refresh response'));
                    }
                    this.authService.setLocalStorage(response.data);
                    this.tokenSubject.next(newToken);
                    return next.handle(this.addToken(request, newToken));
                }),
                catchError((err) => {
                    if (err.status === 401 && this.authService.isLoggedIn()) {
                        this.authService.logout();
                    }
                    try {
                        this.tokenSubject.error(err);
                    } catch {}
                    return throwError(() => err);
                }),
                finalize(() => {
                    this.isRefreshing = false;
                    if (this.tokenSubject.closed) this.tokenSubject = new BehaviorSubject<string | null>(null);
                })
            );
        }

        return this.tokenSubject.pipe(
            filter((token) => token != null),
            take(1),
            switchMap((token) => next.handle(this.addToken(request, token!)))
        );
    }

    private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
        return request.clone({
            headers: request.headers.set(HeadersKeysConstants.AUTHORIZATION, `Bearer ${token}`)
        });
    }
}
