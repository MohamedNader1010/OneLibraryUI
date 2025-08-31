import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { switchMap, takeUntil } from 'rxjs';
import { DestroyableComponentBase } from '../../../../shared/classes/destroyable-component-base.abstract';
import { AuthService } from '../../services/auth.service';
import { IAuthResponseDTO } from '../../../../core/models/Authentication/dtos/auth-response-dto.interface';
import { UnitOfWorkService } from '../../../../core/services/unit-of-work.service';
import { IConfirmEmailCommand } from '../../../../core/models/Authentication/commands/confirm-email-command.interface';
import { IApiResponseT } from '../../../../core/Common/models/response/api-response-t.interface';

@Component({
    selector: 'app-confirm-email',
    templateUrl: './confirm-email.component.html',
    styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent extends DestroyableComponentBase implements OnInit {
    route = inject(ActivatedRoute);
    toastrService = inject(ToastrService);
    router = inject(Router);
    authService = inject(AuthService);
    unitOfWork = inject(UnitOfWorkService);

    userId!: string;

    baseOnInit() {
        this.route.queryParams
            .pipe(
                switchMap((res: any) => {
                    this.userId = res.userId;
                    const command: IConfirmEmailCommand = {
                        token: res.token,
                        userId: res.userId
                    };
                    return this.unitOfWork.authorization.confirmEmail(command);
                }),
                takeUntil(this.unsubscribe$)
            )
            .subscribe({
                next: (response: IApiResponseT<IAuthResponseDTO>) => {
                    this.authService.setLocalStorage(response.data);
                    this.toastrService.success(response.message, 'logged in');
                },
                error: (e) => {
                    this.authService.logout();
                    this.authService.navigateToConfirmationFailed(this.userId);
                },
                complete: () => {
                    this.authService.navigateToLogin();
                }
            });
    }

    baseOnDestroy(): void {
        this.unitOfWork.unsubscribe();
    }
}
