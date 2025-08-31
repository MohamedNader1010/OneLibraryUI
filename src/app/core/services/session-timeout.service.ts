import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../modules/authentication/services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class SessionTimeoutService {
    authService = inject(AuthService);
    toasterService = inject(ToastrService);

    private timeoutId: any;
    private alertId: any;
    private readonly TIMEOUT_DURATION = 15 * 60 * 100000; // 15 minutes
    private readonly ALERT_DURATION = 10 * 60 * 100000; // 10 minute
    private readonly EVENTS = ['mousemove', 'mousedown', 'keypress', 'touchmove'];

    startTimeout(): void {
        this.timeoutId = setTimeout(() => this.authService.logout(), this.TIMEOUT_DURATION);
        this.alertId = setTimeout(() => this.toasterService.warning('سيتم تسجيل خروجك خلال 5 دقائق إذا لم يتم استخدام الجهاز.', 'تنبيه: تسجيل الخروج'), this.ALERT_DURATION);
        this.addListeners();
    }

    stopTimeout(): void {
        this.removeListeners();
        clearTimeout(this.timeoutId);
        clearTimeout(this.alertId);
    }

    private resetTimer = (): void => {
        this.stopTimeout();
        this.startTimeout();
    };

    private addListeners(): void {
        this.EVENTS.forEach((event) => window.addEventListener(event, this.resetTimer, true));
    }

    private removeListeners(): void {
        this.EVENTS.forEach((event) => window.removeEventListener(event, this.resetTimer, true));
    }
}
