import { Component, Input } from '@angular/core';
import { ITableAction } from '../../../../interfaces/table-action.interface';
import { ITableColumn } from '../../../../interfaces/table-column.interface';

@Component({
    selector: 'table-header-cell',
    templateUrl: './table-header-cell.component.html',
    styleUrls: ['./table-header-cell.component.css']
})
export class TableHeaderCellComponent {
    @Input({ required: true }) actions: ITableAction[] = [];
    @Input({ required: true }) isCurrentYear: boolean = false;
    @Input({ required: true }) column!: ITableColumn;
}
