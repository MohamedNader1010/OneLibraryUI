import { catchError, map, Subject, takeUntil } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { UnitOfWorkService } from '../../core/services/unit-of-work.service';
import { ITableColumn } from '../../shared/interfaces/table-column.interface';
import { IClientOverviewDTO } from '../../core/models/Clients/dtos/client-overview-dto.interface';

export function getClientColumns(translate: TranslateService, uow: UnitOfWorkService, unsubscribe$: Subject<void>): ITableColumn[] {
    return [
        {
            columnDef: 'name',
            header: translate.instant('form.name.label'),
            getCellValueFn: (element: IClientOverviewDTO) => element.name,
            filterKey: 'name',
            filterType: 'text'
        },
        {
            columnDef: 'phoneNumber',
            header: translate.instant('form.phoneNumber.label'),
            getCellValueFn: (element: IClientOverviewDTO) => element.phoneNumber,
            filterKey: 'phoneNumber',
            filterType: 'text'
        },
        {
            columnDef: 'clientType',
            header: translate.instant('form.client.type.label'),
            getCellValueFn: (element: IClientOverviewDTO) => element.clientType.name,
            filterAsyncOptions: uow.clientType.getAll().pipe(
                takeUntil(unsubscribe$),
                map((response) => response.data.map((type) => ({ value: type.id, label: type.name }))),
                catchError(() => [])
            ),
            filterKey: 'clientTypeId',
            filterType: 'text'
        },
        {
            columnDef: 'total',
            header: translate.instant('form.client.total.label'),
            getCellValueFn: (element: IClientOverviewDTO) => element.total,
            filterKey: 'total',
            filterType: 'number'
        },
        {
            columnDef: 'paid',
            header: translate.instant('form.client.paid.label'),
            getCellValueFn: (element: IClientOverviewDTO) => element.paid,
            filterKey: 'paid',
            filterType: 'number'
        },
        {
            columnDef: 'rest',
            header: translate.instant('form.client.rest.label'),
            getCellValueFn: (element: IClientOverviewDTO) => element.rest,
            filterKey: 'rest',
            filterType: 'number'
        }
    ];
}
