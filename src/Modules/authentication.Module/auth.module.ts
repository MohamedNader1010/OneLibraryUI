import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatComponentsModule} from '../mat-components.Module/mat-components.module';
import {SharedService} from '../shared/services/shared.service';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {AccessLoginPageGuard} from './guards/AccessLoginPage.guard';
import {AuthRoutingModule} from './routing/auth-routing.module';
import {AuthService} from './services/auth.service';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';

@NgModule({
	declarations: [LoginComponent, RegisterComponent, ResetPasswordComponent, ForgetPasswordComponent, ConfirmEmailComponent],
	imports: [CommonModule, AuthRoutingModule, MatComponentsModule, FormsModule, ReactiveFormsModule],
	providers: [AuthService, SharedService, AccessLoginPageGuard],
})
export class AuthModule {}
