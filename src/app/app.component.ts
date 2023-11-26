import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { SessionTimeoutService } from './core/authentication/services/session-timeout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'OneLibraryUI';
  constructor(translateService: TranslateService, private _sessionTimeoutService: SessionTimeoutService) {
    translateService.setDefaultLang('ar');
    translateService.use('ar');
  }
  ngOnInit(): void {
    this._sessionTimeoutService.startTimeout();
  }
  ngOnDestroy(): void {
    this._sessionTimeoutService.stopTimeout();
  }
}
