import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {JwtModule} from '@auth0/angular-jwt';
import {MatComponentsModule} from '../mat-components.Module/mat-components.module';
import {SharedService} from '../shared/services/shared.service';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {AccessLoginPageGuard} from './guards/AccessLoginPage.guard';
import {AuthRoutingModule} from './routing/auth-routing.module';
import {AuthService} from './services/auth.service';

export function tokenGetter() {
	return localStorage.getItem('token');
}
@NgModule({
	declarations: [LoginComponent, RegisterComponent],
	imports: [
		CommonModule,
		AuthRoutingModule,
		MatComponentsModule,
		FormsModule,
		ReactiveFormsModule,
		JwtModule.forRoot({
			config: {
				tokenGetter: tokenGetter,
				// allowedDomains: ['localhost'],
				// disallowedRoutes: ['http://example.com/examplebadroute/'],
			},
		}),
	],
	providers: [AuthService, SharedService, AccessLoginPageGuard],
})
export class AuthModule {}
