import { IClientOverviewDTO } from '../../core/models/Clients/dtos/client-overview-dto.interface';
import { TableActionPosition } from '../enums/table-action-position.enum';
import { ITableAction } from '../interfaces/table-action.interface';

export function getCreateAction(cb: () => void): ITableAction {
    return {
        condition: (forCurrentYearOnly: boolean) => forCurrentYearOnly,
        action: () => cb(),
        tooltip: 'اضافة جديد',
        icon: 'add',
        position: TableActionPosition.Header
    };
}

export function getEditAction<T>(cb: (row: T) => void): ITableAction {
    return {
        condition: (forCurrentYearOnly: boolean) => forCurrentYearOnly,
        action: (row: T) => cb(row),
        tooltip: 'تعديل',
        icon: 'edit',
        position: TableActionPosition.Row
    };
}

export function getBulkPaymentAction<T>(cb: (row: T) => void): ITableAction {
    return {
        condition: (forCurrentYearOnly: boolean, row: IClientOverviewDTO) => forCurrentYearOnly && row.rest > 0,
        action: (row: T) => cb(row),
        tooltip: 'سداد طلبات العميل',
        icon: 'paid',
        position: TableActionPosition.Row
    };
}

export function getDetailsPageNavigationAction<T>(cb: (row: T) => void): ITableAction {
    return {
        condition: (forCurrentYearOnly: boolean) => forCurrentYearOnly,
        action: (row: T) => cb(row),
        tooltip: 'عرض التفاصيل',
        icon: 'info',
        position: TableActionPosition.Row
    };
}
