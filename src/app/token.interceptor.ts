import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpInterceptor} from '@angular/common/http';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	constructor() {}

	intercept(request: HttpRequest<any>, next: HttpHandler) {
		request = request.clone({headers: request.headers.set('Content-Type', 'application/json')});
		let token = localStorage.getItem('token');
		if (token) {
			request = request.clone({headers: request.headers.set('Authorization', `Bearer ${token}`)});
		}
		return next.handle(request);
	}
}
