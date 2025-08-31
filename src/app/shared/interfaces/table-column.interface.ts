import { Observable } from 'rxjs';
import { ITableFilterOption } from './table-filter-option.interface';

export interface ITableColumn {
    columnDef: string;
    header: string;

    getCellValueFn: (element: any) => any;

    filterOptions?: ITableFilterOption[];
    filterAsyncOptions?: Observable<ITableFilterOption[]>;
    disableFilter?: boolean;
    filterValue?: any;
    filterKey?: string;
    filterType?: 'date' | 'email' | 'number' | 'tel' | 'text' | 'time';

    disableSort?: boolean;
}
