import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { AuthService } from '../../modules/authentication/services/auth.service';

export const loginGuard: CanMatchFn = (route, state) => {
    const authService = inject(AuthService);

    if (!authService.isLoggedIn()) {
        return true;
    }

    authService.redirectAfterLogin();
    return false;
};
