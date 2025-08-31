import { Pipe, PipeTransform } from '@angular/core';
import { ITableColumn } from '../interfaces/table-column.interface';

@Pipe({ name: 'isActionsCol' })
export class ActionsColumnPipe implements PipeTransform {
    transform(column: ITableColumn): boolean {
      const isActionsColumn = column.columnDef === 'actions' || column.columnDef?.toLowerCase().includes('actions');
      return isActionsColumn;
    }
}
