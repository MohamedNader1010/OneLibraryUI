import { Input, Directive, ViewChild, inject, AfterViewInit } from '@angular/core';
import { DestroyableComponentBase } from '../../../classes/destroyable-component-base.abstract';
import { ITableAction } from '../../../interfaces/table-action.interface';
import { ITableColumn } from '../../../interfaces/table-column.interface';
import { BackendDataSource } from './datasource/backend-datasource';
import { TableCommunicationService } from '../../../services/table-communication.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { IBaseFilterParams } from '../../../../core/Common/models/request/base-filter-params.model';
import { SignalRService } from '../../../../core/services/signalR.service';
import { TableActionPosition } from '../../../enums/table-action-position.enum';
import { FrontendDataSource } from './datasource/frontend-datasource';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Directive()
export abstract class TableComponentBase<T> extends DestroyableComponentBase implements AfterViewInit {
    @Input({ required: true }) tableColumns: ITableColumn[] = [];
    @Input({ required: true }) tableActions: ITableAction[] = [];

    tableCommunicationService = inject(TableCommunicationService);

    abstract dataSource: BackendDataSource<T> | FrontendDataSource<T>;
    abstract onInit(): void;
    abstract afterViewInit(): void;

    @ViewChild(MatSort, { static: true }) sort!: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

    signalRService = inject(SignalRService);

    pageSizeOptions: number[] = [25, 50, 100, 250];
    rowActions: ITableAction[] = [];
    headerActions: ITableAction[] = [];
    headerColumns!: string[];
    filterColumns!: string[];
    // isCurrentYear: boolean = true;
    activeSortColumn: string = 'Id';

    baseOnInit(): void {
        this.onInit();
        this.subscribeToTableReload();

        // this.isCurrentYear = localStorage.getItem(LocalStorageKeys.FISCAL_YEAR_IS_CURRENT) === 'true';
        // this.signalRService.connectToNotificationHub();

        this.rowActions = this.tableActions.filter((action: ITableAction) => action.position === TableActionPosition.Row);
        this.headerActions = this.tableActions.filter((action: ITableAction) => action.position === TableActionPosition.Header);

        if (!this.tableColumns.some((col) => col.columnDef === 'actions'))
            this.tableColumns.push({ columnDef: 'actions' } as ITableColumn);
        this.headerColumns = [...this.tableColumns.map((c: ITableColumn) => c.columnDef)];
        this.filterColumns = [...this.tableColumns.map((c: ITableColumn) => 'filter_' + c.columnDef)];
    }

    ngAfterViewInit(): void {
        this.afterViewInit();
    }

    subscribeToTableReload() {}

    onFilterChange(event: Event | MatSelectChange | MatDatepickerInputEvent<Date>, column: ITableColumn) {
        let filterValue: any;
        let filters: IBaseFilterParams[] = this.dataSource.filters;

        if (event instanceof MatSelectChange) {
            filterValue = event.value;
        } else if (event instanceof MatDatepickerInputEvent) {
            const date = (event as MatDatepickerInputEvent<Date>).value;
            filterValue = date ? new Date(date).toISOString() : null;
        } else if ((event as Event).target) {
            filterValue = ((event as Event).target as HTMLInputElement).value.trim().toLowerCase();
        }

        const key = column.filterKey ?? column.columnDef;
        const filterValueExists = filterValue !== null && filterValue !== undefined && filterValue !== '';

        if (filterValueExists) {
            const newFilter = {
                key: key,
                value: isNaN(filterValue) ? this.#trimIfBarcode(filterValue) : filterValue
            };

            const idx = filters.findIndex((f) => f.key === key);
            filters = idx > -1 ? filters.map((f) => (f.key === key ? newFilter : f)) : [...filters, newFilter];
        } else {
            filters = filters.filter((f) => f.key !== key);
        }

        this.dataSource.setFilters(filters);
    }

    onClearFilters() {
        this.tableColumns.forEach((column: ITableColumn) => (column.filterValue = ''));
        this.dataSource.clearFilters();
    }

    handleSortChange(event: any, column: ITableColumn): void {
        event.stopPropagation();
        if (column.disableSort) return;

        this.activeSortColumn = column.columnDef;
    }
    #trimIfBarcode(value: any) {
        const barPrefix = 'bar-';
        return (value.indexOf(barPrefix) ?? -1) === -1 ? value : value.substring(barPrefix.length);
    }

    baseOnDestroy(): void {
        this.signalRService.disconnectFromNotificationHub();
        console.log(`component ${this.constructor.name} destroyed`);
    }
}
