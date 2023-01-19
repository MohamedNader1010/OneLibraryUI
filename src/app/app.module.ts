import {LoginGuard} from './../Modules/authentication.Module/guards/login.guard';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CommonModule} from '@angular/common';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from './token.interceptor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {JwtModule} from '@auth0/angular-jwt';
import {environment} from 'src/environments/environment';

export function tokenGetter() {
	return localStorage.getItem('token');
}
@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		CommonModule,
		JwtModule.forRoot({
			config: {
				tokenGetter: tokenGetter,
				allowedDomains: [environment.host],
				disallowedRoutes: [],
			},
		}),
		ToastrModule.forRoot({preventDuplicates: true, positionClass: 'toast-bottom-left', progressBar: true, newestOnTop: true, progressAnimation: 'decreasing'}),
		BrowserAnimationsModule,
	],
	bootstrap: [AppComponent],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptor,
			multi: true,
		},
		LoginGuard,
	],
})
export class AppModule {}
