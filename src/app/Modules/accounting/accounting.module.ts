import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatComponentsModule } from '../../shared/mat-components.module';
import { SharedModule } from '../../shared/shared.module';
import { AccountSummaryComponent } from './components/account-summary/account-summary.component';

@NgModule({
    declarations: [AccountSummaryComponent],
    exports: [AccountSummaryComponent],
    imports: [CommonModule, MatComponentsModule, SharedModule, TranslateModule]
})
export class AccountingModule {}
