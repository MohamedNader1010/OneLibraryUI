import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {SessionTimeoutService} from './session-timeout.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
	title = 'OneLibraryUI';
	constructor(private translate: TranslateService, private sessionTimeoutService: SessionTimeoutService) {
		translate.setDefaultLang('en');
		translate.use('en');
	}
	ngOnInit(): void {
		this.sessionTimeoutService.startTimeout();
	}
	ngOnDestroy(): void {
		this.sessionTimeoutService.stopTimeout();
	}
}
