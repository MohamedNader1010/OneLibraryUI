import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpInterceptor, HttpErrorResponse, HttpEvent} from '@angular/common/http';
import {BehaviorSubject, switchMap, filter, take, catchError, Observable, throwError, shareReplay} from 'rxjs';
import {Auth} from 'src/Modules/authentication.Module/interfaces/IAuth';
import {AuthService} from 'src/Modules/authentication.Module/services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	private isRefreshing = false;
	private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
	constructor(private _auth: AuthService) {}
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		request = request.clone({headers: request.headers.set('Content-Type', 'application/json')});
		let token = localStorage.getItem('token');
		if (token) request = request.clone({headers: request.headers.set('Authorization', `Bearer ${token}`)});
		return next.handle(request).pipe(
			catchError((error) => {
				if (error instanceof HttpErrorResponse && error.status === 401) return this.handle401Error(request, next);
				else 
					return throwError(() => error);	// instead of throwing Instance of Error() 
													// we just throw the catched error from backend!
			})
		);
	}
	private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
		console.log('unauthorized');
		if (!this.isRefreshing) {
			this.isRefreshing = true;
			this.refreshTokenSubject.next(null);
			console.log('intcptr');

			return this._auth.refreshToken().pipe(
				switchMap((res: any) => {
					this.isRefreshing = false;
					console.log('intcptr res', res);
					localStorage.setItem('token', res.token);
					localStorage.setItem('refreshToken', res.refreshToken);
					localStorage.setItem('uname', res.username);
					this.refreshTokenSubject.next(res.token);
					return next.handle(request.clone({setHeaders: {Authorization: `Bearer ${res.token}`}}));
				})
			);
		} else
			return this.refreshTokenSubject.pipe(
				filter((sub) => sub != null),
				take(1),
				switchMap((token) => {
					console.log(token);
					return next.handle(request.clone({setHeaders: {Authorization: token}}));
				})
			);
	}
}
