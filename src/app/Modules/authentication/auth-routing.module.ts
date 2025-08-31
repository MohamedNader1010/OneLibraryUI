import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ConfirmationFailedComponent } from './components/confirmation-failed/confirmation-failed.component';
import { loginGuard } from '../../shared/guards/login.guard';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, title: 'تسجيل الدخول', canMatch: [loginGuard], canActivate: [loginGuard] },
    {
        path: 'confirm-email',
        component: ConfirmEmailComponent,
        title: 'تاكيد البريد الالكتروني',
        canMatch: [loginGuard],
        canActivate: [loginGuard]
    },
    {
        path: 'confirmation-failed',
        component: ConfirmationFailedComponent,
        title: 'فشل تأكيد البريد الإلكتروني',
        canMatch: [loginGuard],
        canActivate: [loginGuard]
    },
    {
        path: 'reset-password',
        component: ResetPasswordComponent,
        title: 'إعداد الرقم السري',
        canMatch: [loginGuard],
        canActivate: [loginGuard]
    },
    {
        path: 'forget-password',
        component: ForgetPasswordComponent,
        title: 'استعادة كلمة المرور',
        canMatch: [loginGuard],
        canActivate: [loginGuard]
    },
    {
        path: 'access-denied',
        component: AccessDeniedComponent,
        title: 'غير مصرح'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}
