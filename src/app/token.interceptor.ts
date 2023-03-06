import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpInterceptor, HttpErrorResponse, HttpEvent} from '@angular/common/http';
import {BehaviorSubject, switchMap, filter, take, catchError, Observable, throwError, shareReplay} from 'rxjs';
import {Auth} from 'src/Modules/authentication.Module/interfaces/IAuth';
import {AuthService} from 'src/Modules/authentication.Module/services/auth.service';
import {Router} from '@angular/router';
import {Response} from './../Modules/shared/interfaces/Iresponse';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	private isRefreshing = false;
	private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
	constructor(private _auth: AuthService, private router: Router) {}
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		request = request.clone({headers: request.headers.set('Content-Type', 'application/json')});
		let token = localStorage.getItem('token');
		if (token) request = request.clone({headers: request.headers.set('Authorization', `Bearer ${token}`)});
		return next.handle(request).pipe(
			catchError((error) => {
				if (error instanceof HttpErrorResponse && error.status === 401) return this.handle401Error(request, next);
				else {
					return throwError(() => error); // instead of throwing Instance of Error()
				}
				// we just throw the catched error from backend!
			})
		);
	}
	private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
		console.log('un authorized');

		if (!this.isRefreshing) {
			this.isRefreshing = true;
			this.refreshTokenSubject.next(null);
			return this._auth.refreshToken().pipe(
				catchError((e) => throwError(() => e)),
				switchMap((res: Response) => {
					this.isRefreshing = false;
					if (res) {
						let auth: Auth = res.body;
						this._auth.setLocalStorage(auth);
						this._auth.username.next(auth.username);
						this.refreshTokenSubject.next(auth.token);
					} else {
						this._auth.clearLocalStorage();
						this._auth.username.next(null);
						this.router.navigate(['/auth/login']);
					}
					return next.handle(request.clone({setHeaders: {Authorization: `Bearer ${res.body.token}`}}));
				})
			);
		} else
			return this.refreshTokenSubject.pipe(
				filter((sub) => sub != null),
				take(1),
				switchMap((token) => {
					return next.handle(request.clone({setHeaders: {Authorization: token}}));
				})
			);
	}
}
