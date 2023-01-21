import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../components/login/login.component';
import {RegisterComponent} from '../components/register/register.component';
import {AccessLoginPageGuard} from '../guards/AccessLoginPage.guard';
const routes: Routes = [
	{path: 'login', component: LoginComponent, title: 'تسجيل الدخول', canActivate: [AccessLoginPageGuard]},
	{path: 'register', component: RegisterComponent, title: 'حساب جديد'},
	{path: 'auth', redirectTo: 'login', pathMatch: 'full'},
	{path: '', redirectTo: '/', pathMatch: 'full'},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AuthRoutingModule {}
