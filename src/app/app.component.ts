import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DestroyableComponentBase } from './shared/classes/destroyable-component-base.abstract';
import { SessionTimeoutService } from './core/services/session-timeout.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent extends DestroyableComponentBase {
    title = 'one-book-store';
    translateService = inject(TranslateService);
    sessionTimeoutService = inject(SessionTimeoutService);

    baseOnInit = (): void => {
        this.translateService.setDefaultLang('ar');
        this.translateService.use('ar');
        this.sessionTimeoutService.startTimeout();
    };

    baseOnDestroy(): void {
        this.sessionTimeoutService.stopTimeout();
    }
}
