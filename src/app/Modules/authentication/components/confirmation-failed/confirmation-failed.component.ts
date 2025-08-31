import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { switchMap, tap } from 'rxjs';
import { IResendConfirmationEmailCommand } from '../../../../core/models/Authentication/commands/resend-confirmation-email-command.interface';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-confirmation-failed',
    templateUrl: './confirmation-failed.component.html',
    styleUrls: ['./confirmation-failed.component.css']
})
export class ConfirmationFailedComponent {
    route = inject(ActivatedRoute);
    authService = inject(AuthService);
    toastrService = inject(ToastrService);

    emailSent = false;
    isSubmitting = false;

    buttonText = 'Resend Confirmation Email';

    resendConfirmationEmail() {
        this.isSubmitting = true;
        this.route.queryParams
            .pipe(
                switchMap((params: any) => {
                    const command: IResendConfirmationEmailCommand = { userId: params.userId };
                    return this.authService.resendConfirmationEmail(command);
                }),
                tap(() => {
                    this.authService.logout();
                })
            )
            .subscribe({
                next: (response) => {
                    this.isSubmitting = false;
                    this.emailSent = true;
                    this.toastrService.success(response.message, 'Success');
                    this.setButtonCountdown();
                },
                error: (error) => {
                    this.isSubmitting = false;
                    this.emailSent = false;
                }
            });
    }

    setButtonCountdown() {
        let countdown = 30;
        this.buttonText = `Resend Confirmation Email (${countdown})`;
        const interval = setInterval(() => {
            countdown--;
            this.buttonText = `Resend Confirmation Email (${countdown})`;
            if (countdown <= 0) {
                clearInterval(interval);
                this.buttonText = 'Resend Confirmation Email';
                this.isSubmitting = false;
            }
        }, 1000);
    }
}
