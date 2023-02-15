import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ConfirmEmailComponent} from '../components/confirm-email/confirm-email.component';
import {ForgetPasswordComponent} from '../components/forget-password/forget-password.component';
import {LoginComponent} from '../components/login/login.component';
import {RegisterComponent} from '../components/register/register.component';
import {ResetPasswordComponent} from '../components/reset-password/reset-password.component';
import {AccessLoginPageGuard} from '../guards/AccessLoginPage.guard';
const routes: Routes = [
	{path: 'login', component: LoginComponent, title: 'تسجيل الدخول', canActivate: [AccessLoginPageGuard]},
	{path: 'register', component: RegisterComponent, title: 'حساب جديد'},
	{path: 'confirmEmail', component: ConfirmEmailComponent, title: 'تاكيد البريد الالكتروني'},
	{path: 'resetPassword', component: ResetPasswordComponent, title: 'إعداد الرقم السري'},
	{path: 'forgetPassword', component: ForgetPasswordComponent, title: 'نسيت الرقم السري'},
	{path: 'auth', redirectTo: 'login', pathMatch: 'full'},
	{path: '', redirectTo: '/', pathMatch: 'full'},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AuthRoutingModule {}
