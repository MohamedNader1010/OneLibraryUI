import { ChangeDetectorRef, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Order } from '../../../core/data/models/order/Iorder';
import { FormFactory } from '../../classes/form.factory';
import { ComponentsName } from '../../enums/components.name.enum';
import { FormDialogNames } from '../../enums/forms-name.enum';
import { ResponseDto } from '../../interfaces/response.dto';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  template: '',
})
export class BaseTableActions {
  @ViewChild('paginator', { static: true }) paginator!: MatPaginator;

  @Output() OnView = new EventEmitter<any>();
  @Output() onClose = new EventEmitter();
  @Output() onTransaction = new EventEmitter<any>();
  @Output() onNotePrint = new EventEmitter<any>();
  @Output() onMarkAsReady = new EventEmitter<any>();

  @Input() database: any;
  @Input() formName!: FormDialogNames;
  @Input() componentName!: ComponentsName;

  @Input() canEdit: boolean = true;
  @Input() canView: boolean = false;
  @Input() hasTransaction: boolean = false;
  @Input() canNavigateToDetails: boolean = false;
  @Input() canExpand: boolean = false;
  @Input() canMarkOrderDetailAsReady: boolean = false;
  @Input() canPrintNote: boolean = false;
  @Input() canPayBulk: boolean = false;
  @Input() canAdd: boolean = true;
  @Input() toggleShift: boolean = false;

  #router = inject(Router);
  #activatedRoute = inject(ActivatedRoute);
  dialog = inject(MatDialog);
  cdRef = inject(ChangeDetectorRef);
  datePipe = inject(DatePipe);

  refreshTable = () => this.paginator._changePageSize(this.paginator.pageSize);

  async HandleNew() {
    const dialogComponent = await FormFactory.getAppropriateDialogComponent(this.formName);
    const dialogRef = this.dialog.open<any>(dialogComponent, {
      minWidth: '30%',
    });
    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result?.data) {
          if (this.componentName == ComponentsName.order) {
            let newOrder: Order = (result.data as ResponseDto).body;
            let lastOrder: Order = (this.database.dataChange.value as ResponseDto).body[(this.database.dataChange.value as ResponseDto).body.length - 1];
            if (lastOrder.id != newOrder.id) {
            }
          }
        }
      },
      complete: () => this.refreshTable(),
    });
  }

  async handleEdit(row: any, $event: any) {
    $event.stopPropagation();
    const dialogComponent = await FormFactory.getAppropriateDialogComponent(this.formName);
    const dialogRef = this.dialog.open<any>(dialogComponent, { minWidth: '30%', data: row });
    dialogRef.afterClosed().subscribe({
      complete: () => this.refreshTable(),
    });
  }

  async handleTransaction(row: any, $event: any) {
    $event.stopPropagation();
    let dialogComponent = null;
    if (this.componentName == ComponentsName.commitmentAndDue) {
      dialogComponent = await FormFactory.getAppropriateDialogComponent(FormDialogNames.commitmentAndDueComponentTransactionFormDialog);
    } else {
      dialogComponent = await FormFactory.getAppropriateDialogComponent(FormDialogNames.orderTransactionFormDialogComponent);
    }
    const dialogRef = this.dialog.open<any>(dialogComponent, {
      data: row,
      minWidth: '30%',
    });
    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result?.data) this.onTransaction.emit(result.data);
      },
      complete: () => this.refreshTable(),
    });
  }

  async handleView(row: any, $event: any) {
    $event.stopPropagation();
    const dialogComponent = await FormFactory.getAppropriateDialogComponent(FormDialogNames.orderDetailsDialogComponent);
    const dialogRef = this.dialog.open<any>(dialogComponent, {
      data: row,
      minWidth: '30%',
    });
  }

  navigate(row: any, $event: any) {
    $event.stopPropagation();
    this.#router.navigate(['details', row.id], { relativeTo: this.#activatedRoute });
  }

  handleViewPdf = (row: any, $event: any) => {
    $event.stopPropagation();
    const filePath = row.filePath;
    const uploadsIndex = filePath.indexOf('uploads');
    if (uploadsIndex !== -1) {
      const trimmedPath = filePath.substring(uploadsIndex);
      window.open(`${environment.host}${trimmedPath}`, '_blank');
    } else {
      alert('not found');
    }
  };

  async handleBulkPayment(row: any, $event: any) {
    $event.stopPropagation();
    const dialogComponent = await FormFactory.getAppropriateDialogComponent(FormDialogNames.clientBulkPaymentFormDialog);
    const dialogRef = this.dialog.open<any>(dialogComponent, {
      data: row,
      minWidth: '30%',
    });
    dialogRef.afterClosed().subscribe({
      complete: () => this.refreshTable(),
    });
  }

  MarkAsReady = (row: any, $event: any) => {
    $event.stopPropagation();
    this.onMarkAsReady.emit(row);
  };

  printNote = (row: any, $event: any) => {
    $event.stopPropagation();
    this.onNotePrint.emit(row);
  };
}
