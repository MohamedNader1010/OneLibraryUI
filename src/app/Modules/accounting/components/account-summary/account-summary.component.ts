import { Component, Input } from '@angular/core';
import { IAccountOverviewDTO } from '../../../../core/models/Accounting/dtos/account-overview-dto.interface';

@Component({
    selector: 'app-account-summary',
    templateUrl: './account-summary.component.html',
    styleUrls: ['./account-summary.component.css']
})
export class AccountSummaryComponent {
    @Input({ required: true }) account!: IAccountOverviewDTO;
}
