import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DestroyableComponentBase } from '../../../../shared/classes/destroyable-component-base.abstract';
import { AuthService } from '../../services/auth.service';
import { IForgetPasswordCommand } from '../../../../core/models/Authentication/commands/forget-password-command.interface';
import { UnitOfWorkService } from '../../../../core/services/unit-of-work.service';
import { TypedFormGroup } from '../../../../core/types/common.types';

@Component({
    selector: 'app-forget-password',
    templateUrl: './forget-password.component.html',
    styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent extends DestroyableComponentBase implements OnInit {
    authService = inject(AuthService);
    fb = inject(FormBuilder);
    unitOfWork = inject(UnitOfWorkService);
    toastrService = inject(ToastrService);
    router = inject(Router);

    form!: TypedFormGroup<IForgetPasswordCommand>;
    isSubmitting: boolean = false;

    baseOnInit(): void {
        this.form = this.fb.group({
            email: this.fb.nonNullable.control<string>('', [Validators.required, Validators.email])
        });
    }

    handleLogin() {
        this.router.navigate(['auth/login']);
    }

    handleSubmit() {
        if (this.form.valid) {
            this.isSubmitting = true;
            this.unitOfWork.authorization.forgetPassword(this.form.getRawValue()).subscribe({
                next: (data) => {
                    this.toastrService.success(data.message, 'check your email');
                    this.isSubmitting = false;
                    this.authService.navigateToLogin();
                },
                error: () => (this.isSubmitting = false),
            });
        }
    }

    baseOnDestroy(): void {
        this.unitOfWork.unsubscribe();
    }
}
