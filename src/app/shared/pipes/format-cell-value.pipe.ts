import { inject, Pipe, PipeTransform } from '@angular/core';
import { ITableColumn } from '../interfaces/table-column.interface';
import { DatePipe } from '@angular/common';

@Pipe({ name: 'formatCellValue' })
export class FormatCellValuePipe implements PipeTransform {
    datePipe = inject(DatePipe);
    transform(column: ITableColumn | null | undefined, row: any): any {
        if (!column || !row || typeof column.getCellValueFn !== 'function') {
            return '';
        }

        const raw = column.getCellValueFn(row);

        if (raw === undefined || raw === null || raw === '' || raw === 'undefined' || raw === 'null') {
            return '';
        }

        const colDef = (column.columnDef || '').toString();
        const isDateLike =
            column.filterType === 'date' ||
            ['time', 'createdOn', 'modifiedOn', 'checkIn', 'checkOut', 'date'].some((k) => colDef.includes(k));

        if (!isDateLike) return raw;

        const date = this.toDate(raw);
        if (!date) return '';

        return this.datePipe.transform(date, 'dd/MM/yyyy || hh:mm a') ?? '';
    }

    private toDate(val: any): Date | null {
        if (val instanceof Date) {
            return isNaN(val.getTime()) ? null : val;
        }
        if (typeof val === 'number') {
            const d = new Date(val);
            return isNaN(d.getTime()) ? null : d;
        }
        if (typeof val === 'string') {
            const d = new Date(val);
            return isNaN(d.getTime()) ? null : d;
        }
        return null;
    }
}
