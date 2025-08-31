import { Injectable, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ITableAction } from '../interfaces/table-action.interface';
import { ITableColumn } from '../interfaces/table-column.interface';
import { DestroyableComponentBase } from './destroyable-component-base.abstract';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatDialogCommunicationService } from '../services/mat-dialog-communication.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { TableCommunicationService } from '../services/table-communication.service';
import { UnitOfWorkService } from '../../core/services/unit-of-work.service';
import { IBaseDTO } from '../../core/Common/models/dtos/base-dto.interfaces';
import { takeUntil } from 'rxjs';
import { ComponentType } from '@angular/cdk/portal';
import { ColumnsToken, getColumns } from '../utilities/table-columns/table-columns.factory';

@Injectable()
export abstract class DataComponentBase extends DestroyableComponentBase {
    router = inject(Router);
    activatedRoute = inject(ActivatedRoute);
    tableCommunicationService = inject(TableCommunicationService);
    matDialog = inject(MatDialog);
    matDialogCommunicationService = inject(MatDialogCommunicationService);
    translateService = inject(TranslateService);
    toastrService = inject(ToastrService);
    unitOfWorkService = inject(UnitOfWorkService);
    tableColumns: ITableColumn[] = [];
    baseDtoColumns: ITableColumn[] = [
        {
            columnDef: 'id',
            header: this.translateService.instant('table.columns.id'),
            getCellValueFn: (element: IBaseDTO) => `${element.id}`,
            filterKey: 'id',
            filterType: 'text'
        },
        {
            columnDef: 'createdOn',
            header: this.translateService.instant('table.columns.createdOn'),
            getCellValueFn: (element: IBaseDTO) => `${element.createdOn}`,
            filterKey: 'createdOn',
            filterType: 'date'
        },
        {
            columnDef: 'createdBy',
            header: this.translateService.instant('table.columns.createdBy'),
            getCellValueFn: (element: IBaseDTO) => `${element.createdBy}`,
            filterKey: 'createdBy',
            filterType: 'text'
        },
        {
            columnDef: 'modifiedOn',
            header: this.translateService.instant('table.columns.modifiedOn'),
            getCellValueFn: (element: IBaseDTO) => `${element.modifiedOn}`,
            filterKey: 'modifiedOn',
            filterType: 'date'
        },
        {
            columnDef: 'modifiedBy',
            header: this.translateService.instant('table.columns.modifiedBy'),
            getCellValueFn: (element: IBaseDTO) => `${element.modifiedBy}`,
            filterKey: 'modifiedBy',
            filterType: 'text'
        }
    ];

    abstract columnsToken: ColumnsToken;
    abstract tableActions: ITableAction[];
    abstract onInit(): void;
    abstract onDestroy(): void;

    baseOnInit(): void {
        this.tableColumns = getColumns(this.columnsToken, this.translateService, this.unitOfWorkService, this.unsubscribe$);
        this.addAuditColumns();
        this.onInit();
    }

    addAuditColumns() {
        const idColumn = this.baseDtoColumns[0];
        const auditColumns = this.baseDtoColumns.slice(1);
        const userColumns = this.tableColumns ?? [];

        const seen = new Set<string>();
        this.tableColumns = [idColumn, ...userColumns, ...auditColumns].filter((c) => {
            const key = c.columnDef;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
    }

    openDialogWithAutoReload<C, R = any, D = any>(component: ComponentType<C>, Data?: D): MatDialogRef<C, R> {
        const config: MatDialogConfig<D> = {
            minWidth: '30%',
            data: Data
        };
        const dialogRef = this.matDialog.open<C, D, R>(component, config);
        this.matDialogCommunicationService.addDialog(dialogRef);

        dialogRef
            .afterClosed()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((result: R | undefined) => {
                this.matDialogCommunicationService.removeDialog(dialogRef);
                if (result) {
                    this.tableCommunicationService.reload();
                }
            });

        return dialogRef;
    }

    baseOnDestroy(): void {
        this.onDestroy();
        this.unitOfWorkService.unsubscribe();
        console.log(`component ${this.constructor.name} destroyed`);
    }
}
