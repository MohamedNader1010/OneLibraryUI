import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { DestroyableComponentBase } from '../../../../shared/classes/destroyable-component-base.abstract';
import { AuthService } from '../../services/auth.service';
import { TypedFormGroup } from '../../../../core/types/common.types';
import { IResetPasswordCommand } from '../../../../core/models/Authentication/commands/reset-password-command.interface';
import { MatchValidator, PasswordValidator } from '../../../../shared/validators/CustomValidators';
import { UnitOfWorkService } from "../../../../core/services/unit-of-work.service";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent extends DestroyableComponentBase {
    router = inject(Router);
    route = inject(ActivatedRoute);
    fb = inject(FormBuilder);
    authService = inject(AuthService);
    unitOfWorkService = inject(UnitOfWorkService);
    toastrService = inject(ToastrService);

    form!: TypedFormGroup<IResetPasswordCommand>;
    hide = true;
    hideConfirm = true;
    isSubmitting: boolean = false;

    baseOnInit(): void {
        this.form = this.fb.group(
            {
                userId: this.fb.nonNullable.control('', { validators: [Validators.required] }),
                token: this.fb.nonNullable.control('', { validators: [Validators.required] }),
                newPassword: this.fb.nonNullable.control('', { validators: [Validators.required, PasswordValidator()] }),
                confirmPassword: this.fb.nonNullable.control('', { validators: [Validators.required] })
            },
            { validators: MatchValidator('newPassword', 'confirmPassword') }
        );

        this.route.queryParams.pipe(takeUntil(this.unsubscribe$)).subscribe((res: any) => {
            this.form.controls.userId.setValue(res.userId);
            this.form.controls.token.setValue(res.token);
        });
    }

    handleSubmit() {
        if (this.form.valid) {
            this.isSubmitting = true;
            this.unitOfWorkService.authorization.resetPassword(this.form.getRawValue()).subscribe({
            next: (response) => {
                this.toastrService.success(response.message || 'Password reset successfully');
                this.authService.navigateToLogin();
            }
        });
        }
    }

    baseOnDestroy() {
      this.unitOfWorkService.unsubscribe();
    }
}
