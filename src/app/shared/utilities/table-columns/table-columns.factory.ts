import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { UnitOfWorkService } from '../../../core/services/unit-of-work.service';
import { ITableColumn } from '../../interfaces/table-column.interface';

export type ColumnsFactory = (
    translate: TranslateService,
    unitOfWork: UnitOfWorkService,
    unsubscribe$: Subject<void>
) => ITableColumn[];

export type ColumnsToken = string | symbol;

const registry = new Map<ColumnsToken, ColumnsFactory>();

export function registerColumnsFactory(token: ColumnsToken, factory: ColumnsFactory): void {
    registry.set(token, factory);
}

export function getColumns<T>(
    token: ColumnsToken,
    translate: TranslateService,
    uow: UnitOfWorkService,
    unsubscribe$: Subject<void>
): ITableColumn[] {
    const factory = registry.get(token);
    if (!factory) {
        throw new Error('No columns factory registered for token');
    }
    return factory(translate, uow, unsubscribe$);
}
