import { inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { LocalStorageKeys } from '../../../shared/constants/local-storage-keys.constants';
import { MatDialogCommunicationService } from '../../../shared/services/mat-dialog-communication.service';
import { UnitOfWorkService } from '../../../core/services/unit-of-work.service';
import { ToastrService } from 'ngx-toastr';
import { IProfileDTO } from '../../../core/models/Authentication/dtos/profile-dto.interface';
import { Roles } from '../../../core/enums/roles.enum';
import { IConfirmEmailCommand } from '../../../core/models/Authentication/commands/confirm-email-command.interface';
import { IRefreshTokenCommand } from '../../../core/models/Authentication/commands/refresh-token-command.interface';
import { IResendConfirmationEmailCommand } from '../../../core/models/Authentication/commands/resend-confirmation-email-command.interface';
import { IAuthResponseDTO } from '../../../core/models/Authentication/dtos/auth-response-dto.interface';
import { IApiResponseT } from '../../../core/Common/models/response/api-response-t.interface';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    matDialogCommunicationService = inject(MatDialogCommunicationService);
    jwtHelperService = inject(JwtHelperService);
    router = inject(Router);
    unitOfWork = inject(UnitOfWorkService);
    toastrService = inject(ToastrService);

    loggedInUserSignal = signal<IProfileDTO | null>(null);

    get loggedInUser() {
        return this.loggedInUserSignal();
    }
    get isAdmin(): boolean {
        return this.extractRoleFromToken() === Roles.Admin;
    }
    get isManager(): boolean {
        return this.extractRoleFromToken() === Roles.Manager;
    }
    get isSenior(): boolean {
        return this.extractRoleFromToken() === Roles.Senior;
    }
    get isEmployee(): boolean {
        return !this.extractRoleFromToken() || this.extractRoleFromToken() === Roles.Employee;
    }

    isLoggedIn = () => !!this.getAccessToken();

    getAccessToken(): string | null {
        return localStorage.getItem(LocalStorageKeys.TOKEN);
    }

    getRefreshToken(): string | null {
        return localStorage.getItem(LocalStorageKeys.REFRESH_TOKEN);
    }

    setLocalStorage(auth: IAuthResponseDTO) {
        localStorage.setItem(LocalStorageKeys.TOKEN, auth.tokens.accessToken);
        localStorage.setItem(LocalStorageKeys.REFRESH_TOKEN, auth.tokens.refreshToken);
        localStorage.setItem(LocalStorageKeys.UNAME, auth.username);
        localStorage.setItem(LocalStorageKeys.UID, auth.id);
    }

    redirectAfterLogin() {
        this.router.navigate([this.router.routerState.snapshot.root.queryParams['returnUrl'] ?? '/']);
    }

    navigateToLogin() {
        const currentUrl = this.router.routerState.snapshot.url;
        const isLoginRoute = currentUrl.split('?')[0] === '/auth/login';
        const returnUrl = this.router.routerState.snapshot.root.queryParams['returnUrl'] ?? (!isLoginRoute ? currentUrl : undefined);

        if (returnUrl) {
            this.router.navigate(['/auth/login'], { queryParams: { returnUrl }, replaceUrl: true });
        } else {
            this.router.navigate(['/auth/login'], { replaceUrl: true });
        }
    }

    navigateToForgetPassword() {
        this.router.navigate(['/auth/forget-password']);
    }

    navigateToConfirmationFailed(userId: string) {
        this.router.navigate(['/auth/confirmation-failed'], { queryParams: { userId } });
    }

    navigateToForbidden() {
        this.router.navigate(['/auth/access-denied']);
    }

    extractRoleFromToken() {
        let token = this.getAccessToken();
        if (!token) return null;
        const role = this.jwtHelperService.decodeToken(token)['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        return role;
    }

    refreshToken(): Observable<IApiResponseT<IAuthResponseDTO>> {
        const refreshToken = this.getRefreshToken();

        if (!refreshToken) {
            this.logout();
            return throwError(() => new Error('No refresh token available'));
        }

        const command: IRefreshTokenCommand = { refreshToken };

        return this.unitOfWork.authorization.refreshToken(command).pipe(
            tap((response) => {
                if (response?.data) {
                    this.setLocalStorage(response.data);
                }
            }),
            catchError((err) => {
                this.logout();
                return throwError(() => err);
            })
        );
    }

    logout() {
        this.matDialogCommunicationService.closeAllDialogs();
        localStorage.clear();
        this.loggedInUserSignal.set(null);
        this.navigateToLogin();
    }

    resendConfirmationEmail(command: IResendConfirmationEmailCommand): Observable<IApiResponseT<any>> {
        return this.unitOfWork.authorization.resendConfirmationEmail(command);
    }

    confirmEmail(command: IConfirmEmailCommand): Observable<IApiResponseT<IAuthResponseDTO>> {
        return this.unitOfWork.authorization.confirmEmail(command);
    }
}
