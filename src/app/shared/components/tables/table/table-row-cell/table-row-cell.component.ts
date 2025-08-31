import { Component, Input } from '@angular/core';
import { ITableColumn } from '../../../../interfaces/table-column.interface';
import { ITableAction } from '../../../../interfaces/table-action.interface';

@Component({
    selector: 'table-row-cell',
    templateUrl: './table-row-cell.component.html',
    styleUrls: ['./table-row-cell.component.css']
})
export class TableRowCellComponent {
    @Input({ required: true }) actions: ITableAction[] = [];
    @Input({ required: true }) isCurrentYear: boolean = false;
    @Input({ required: true }) column!: ITableColumn;
    @Input() row: any = {};

    isBarcode = (columnDef: string): boolean => columnDef.toLowerCase().includes('barcode');
}
