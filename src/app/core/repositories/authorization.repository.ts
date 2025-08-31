import { Injectable } from '@angular/core';
import { BaseApiRepository } from './common/base-api.repository';
import { Observable, shareReplay } from 'rxjs';
import { BACKEND_APIs } from '../apis/backend-apis';
import { IChangePasswordCommand } from '../models/Authentication/commands/change-password-command.interface';
import { IConfirmEmailCommand } from '../models/Authentication/commands/confirm-email-command.interface';
import { ILoginCommand } from '../models/Authentication/commands/login-command.interface';
import { ILogoutCommand } from '../models/Authentication/commands/logout-command.interface';
import { IRefreshTokenCommand } from '../models/Authentication/commands/refresh-token-command.interface';
import { IResendConfirmationEmailCommand } from '../models/Authentication/commands/resend-confirmation-email-command.interface';
import { IResetPasswordCommand } from '../models/Authentication/commands/reset-password-command.interface';
import { IApiResponseT } from '../Common/models/response/api-response-t.interface';
import { IAuthResponseDTO } from '../models/Authentication/dtos/auth-response-dto.interface';
import { IForgetPasswordCommand } from '../models/Authentication/commands/forget-password-command.interface';
import { IProfileDTO } from '../models/Authentication/dtos/profile-dto.interface';
import { IUpdateProfileCommand } from '../models/Authentication/commands/update-profile-command.interface';

@Injectable({ providedIn: 'root' })
export class AuthorizationRepository extends BaseApiRepository {
    login = (command: ILoginCommand): Observable<IApiResponseT<IAuthResponseDTO>> =>
        this.post<IApiResponseT<IAuthResponseDTO>>(BACKEND_APIs.authorization.login(), command).pipe(shareReplay(1));

    refreshToken = (command: IRefreshTokenCommand): Observable<IApiResponseT<IAuthResponseDTO>> =>
        this.post<IApiResponseT<IAuthResponseDTO>>(BACKEND_APIs.authorization.refreshToken(), command);

    resendConfirmationEmail = (command: IResendConfirmationEmailCommand): Observable<IApiResponseT<any>> =>
        this.post<IApiResponseT<any>>(BACKEND_APIs.authorization.resendConfirmEmail(), command);

    confirmEmail = (command: IConfirmEmailCommand): Observable<IApiResponseT<IAuthResponseDTO>> =>
        this.post<IApiResponseT<IAuthResponseDTO>>(BACKEND_APIs.authorization.confirmEmail(), command);

    forgetPassword = (command: IForgetPasswordCommand): Observable<IApiResponseT<any>> =>
        this.post<IApiResponseT<any>>(BACKEND_APIs.authorization.forgetPassword(), command);

    changePassword = (command: IChangePasswordCommand): Observable<IApiResponseT<any>> =>
        this.post<IApiResponseT<any>>(BACKEND_APIs.authorization.changePassword(), command);

    resetPassword = (command: IResetPasswordCommand): Observable<IApiResponseT<any>> =>
        this.post<IApiResponseT<any>>(BACKEND_APIs.authorization.resetPassword(), command);

    logout = (command: ILogoutCommand): Observable<IApiResponseT<any>> =>
        this.post<IApiResponseT<any>>(BACKEND_APIs.authorization.logout(), command);

    getProfile = (): Observable<IApiResponseT<IProfileDTO>> =>
        this.get<IApiResponseT<IProfileDTO>>(BACKEND_APIs.authorization.profile());

    updateProfile = (command: IUpdateProfileCommand): Observable<IApiResponseT<any>> =>
        this.post<IApiResponseT<any>>(BACKEND_APIs.authorization.profile(), command);
}
