import { inject } from '@angular/core';
import { CanActivateFn, CanActivateChildFn, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../modules/authentication/services/auth.service';

function checkAuth(state: RouterStateSnapshot): boolean {
    const authService = inject(AuthService);

    if (authService.isLoggedIn()) {
        return true;
    }

    authService.navigateToLogin();
    return false;
}

export const authGuard: CanActivateFn = (route, state) => checkAuth(state);
export const authChildGuard: CanActivateChildFn = (route, state) => checkAuth(state);
