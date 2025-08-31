import { inject } from '@angular/core';
import { AuthService } from '../../modules/authentication/services/auth.service';

export const roleGuard = (route: any) => {
    const authService = inject(AuthService);

    const expectedRoles = route.data['roles'] as Array<string>;
    const userRole = authService.extractRoleFromToken();

    if (expectedRoles.includes(userRole)) {
        return true;
    }
    authService.navigateToForbidden();
    return false;
};
