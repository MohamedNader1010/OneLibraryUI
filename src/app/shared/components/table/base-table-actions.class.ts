import { ChangeDetectorRef, EventEmitter, inject, Input, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
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
import { CdkDetailRowDirective } from '../../directives/cdk-detail-row.directive';

@Component({
  template: '',
})
export class BaseTableActions {
  @ViewChild('paginator', { static: true }) paginator!: MatPaginator;
  @ViewChildren(CdkDetailRowDirective) detailRowDirectives!: QueryList<CdkDetailRowDirective>;

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

  actions = [
    {
      condition: (row: any) => this.hasTransaction,
      tooltip: (row: any) => 'تسجيل معاملة مالية',
      icon: (row: any) => 'paid',
      action: (row: any) => this.handleTransaction(row),
    },
    {
      condition: (row: any) => this.canView,
      tooltip: (row: any) => 'عرض التفاصيل',
      icon: (row: any) => 'info',
      action: (row: any) => this.handleView(row),
    },
    {
      condition: (row: any) => this.canNavigateToDetails,
      tooltip: (row: any) => 'الانتقال إلى صفحة التفاصيل',
      icon: (row: any) => 'info',
      action: (row: any) => this.navigate(row),
    },
    {
      condition: (row: any) => this.canEdit,
      tooltip: (row: any) => 'تعديل',
      icon: (row: any) => 'edit',
      action: (row: any) => this.handleEdit(row),
    },
    {
      condition: (row: any) => !!row.filePath,
      tooltip: (row: any) => 'فتح الوثيقة PDF المرتبطة',
      icon: (row: any) => 'open_in_new',
      action: (row: any) => this.handleViewPdf(row),
    },
    {
      condition: (row: any) => this.canPayBulk,
      tooltip: (row: any) => 'إجراء الدفع بالجملة لطلبات العميل',
      icon: (row: any) => 'paid',
      action: async (row: any) => await this.handleBulkPayment(row),
    },
    {
      condition: (row: any) => row.noteClients && row.noteClients.length > 0,
      tooltip: (row: any) => (this.isRowExpanded(row.id) ? 'إغلاق' : 'فتح'),
      icon: (row: any) => (this.isRowExpanded(row.id) ? 'keyboard_arrow_up' : 'keyboard_arrow_down'),
      action: (row: any) => {},
    },
  ];

  isRowExpanded(rowId: string): boolean {
    if (this.detailRowDirectives) {
      const isExists = this.detailRowDirectives.find((x) => x.isRowExpanded(rowId));
      return isExists ? true : false;
    }
    return false;
  }

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

  async handleEdit(row: any) {
    const dialogComponent = await FormFactory.getAppropriateDialogComponent(this.formName);
    const dialogRef = this.dialog.open<any>(dialogComponent, { minWidth: '30%', data: row });
    dialogRef.afterClosed().subscribe({
      complete: () => this.refreshTable(),
    });
  }

  async handleTransaction(row: any) {
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

  async handleView(row: any) {
    const dialogComponent = await FormFactory.getAppropriateDialogComponent(FormDialogNames.orderDetailsDialogComponent);
    const dialogRef = this.dialog.open<any>(dialogComponent, {
      data: row,
      minWidth: '30%',
    });
  }

  navigate = (row: any) => this.#router.navigate(['details', row.id], { relativeTo: this.#activatedRoute });

  handleViewPdf = (row: any) => {
    const filePath = row.filePath;
    const uploadsIndex = filePath.indexOf('uploads');
    if (uploadsIndex !== -1) {
      const trimmedPath = filePath.substring(uploadsIndex);
      window.open(`${environment.host}${trimmedPath}`, '_blank');
    } else {
      alert('not found');
    }
  };

  async handleBulkPayment(row: any) {
    const dialogComponent = await FormFactory.getAppropriateDialogComponent(FormDialogNames.clientBulkPaymentFormDialog);
    const dialogRef = this.dialog.open<any>(dialogComponent, {
      data: row,
      minWidth: '30%',
    });
    dialogRef.afterClosed().subscribe({
      complete: () => this.refreshTable(),
    });
  }

  MarkAsReady = (row: any) => this.onMarkAsReady.emit(row);

  printNote = (row: any) => this.onNotePrint.emit(row);
}
