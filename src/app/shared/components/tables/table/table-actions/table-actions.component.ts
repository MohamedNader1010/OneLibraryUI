import { Component, Input } from '@angular/core';
import { ITableAction } from '../../../../interfaces/table-action.interface';

@Component({
    selector: 'table-actions',
    templateUrl: './table-actions.component.html',
    styleUrls: ['./table-actions.component.css']
})
export class TableActionsComponent {
    @Input({ required: true }) actions!: ITableAction[];
    @Input({ required: true }) isCurrentYear!: boolean;
    @Input() row: any = {};
}
