import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DestroyableComponentBase } from '../../../../shared/classes/destroyable-component-base.abstract';
import { AuthService } from '../../services/auth.service';
import { UnitOfWorkService } from '../../../../core/services/unit-of-work.service';
import { ILoginCommand } from '../../../../core/models/Authentication/commands/login-command.interface';
import { TypedFormGroup } from '../../../../core/types/common.types';
import { finalize, switchMap, tap } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent extends DestroyableComponentBase {
    authService = inject(AuthService);
    unitOfWorkService = inject(UnitOfWorkService);
    router = inject(Router);
    fb = inject(FormBuilder);

    form!: TypedFormGroup<ILoginCommand>;
    isSubmitting: boolean = false;
    hide: boolean = true;

    baseOnInit(): void {
        this.form = this.fb.group({
            email: this.fb.nonNullable.control<string>(''),
            password: this.fb.nonNullable.control<string>('')
        });
    }

    handleForgetPassword() {
        this.router.navigate(['auth/forgetPassword']);
    }

    handleSubmit() {
        if (this.form.valid) {
            this.isSubmitting = true;
            this.unitOfWorkService.authorization
                .login(this.form.getRawValue())
                .pipe(
                    finalize(() => (this.isSubmitting = false)),
                    tap((response) => {
                        this.authService.setLocalStorage(response.data!);
                    }),
                    switchMap(() => this.unitOfWorkService.authorization.getProfile())
                )
                .subscribe({
                    next: (response) => {
                        this.authService.loggedInUserSignal.update(() => response.data);
                    },
                    error: (error) => {
                        this.authService.logout();
                        console.log(error);
                    },
                    complete: () => {
                        this.authService.redirectAfterLogin();
                    }
                });
        }
    }

    baseOnDestroy(): void {
        this.unitOfWorkService.unsubscribe();
    }
}
