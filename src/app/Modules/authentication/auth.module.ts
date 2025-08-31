import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatComponentsModule } from '../../shared/mat-components.module';
import { AuthRoutingModule } from './auth-routing.module';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AccessDeniedComponent } from "./components/access-denied/access-denied.component";
import { ConfirmationFailedComponent } from "./components/confirmation-failed/confirmation-failed.component";

@NgModule({
    declarations: [LoginComponent, ResetPasswordComponent, ForgetPasswordComponent, ConfirmEmailComponent, ConfirmationFailedComponent,AccessDeniedComponent],
    imports: [CommonModule, AuthRoutingModule, MatComponentsModule, FormsModule, ReactiveFormsModule],
})
export class AuthModule {}
