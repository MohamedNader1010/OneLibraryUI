import { TranslateService } from '@ngx-translate/core';
import { ITableColumn } from '../../shared/interfaces/table-column.interface';
import { ITeacherOverviewDTO } from "../../core/models/Teachers/dtos/teacher-overview-dto.interface";
import { Subject } from "rxjs";
import { UnitOfWorkService } from "../../core/services/unit-of-work.service";

export function getTeacherColumns(translate: TranslateService, uow: UnitOfWorkService, unsubscribe$: Subject<void>): ITableColumn[] {
    return [
        {
            columnDef: 'name',
            header: translate.instant('form.name.label'),
            getCellValueFn: (element: ITeacherOverviewDTO) => element.name,
            filterKey: 'name',
            filterType: 'text'
        },
        {
            columnDef: 'phoneNumber',
            header: translate.instant('form.phoneNumber.label'),
            getCellValueFn: (element: ITeacherOverviewDTO) => element.phoneNumber,
            filterKey: 'phoneNumber',
            filterType: 'text'
        },
        {
            columnDef: 'total',
            header: translate.instant('form.client.total.label'),
            getCellValueFn: (element: ITeacherOverviewDTO) => element.total,
            filterKey: 'total',
            filterType: 'number'
        },
        {
            columnDef: 'paid',
            header: translate.instant('form.client.paid.label'),
            getCellValueFn: (element: ITeacherOverviewDTO) => element.paid,
            filterKey: 'paid',
            filterType: 'number'
        },
        {
            columnDef: 'rest',
            header: translate.instant('form.client.rest.label'),
            getCellValueFn: (element: ITeacherOverviewDTO) => element.rest,
            filterKey: 'rest',
            filterType: 'number'
        }
    ];
}
