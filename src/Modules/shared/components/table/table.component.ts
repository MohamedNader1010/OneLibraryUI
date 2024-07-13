import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef, QueryList, ViewChildren, ChangeDetectorRef, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { debounceTime, distinctUntilChanged, switchMap, fromEvent, Subject } from 'rxjs';
import { FormDialogNames } from 'src/Modules/shared/enums/forms-name.enum';
import { FormHelpers } from '../../classes/form-helpers';
import { TableDataSource } from './tableDataSource';
import { ComponentsName } from 'src/Modules/shared/enums/components.name.enum';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { environment } from '../../../../environments/environment';
import { MatPaginator } from '@angular/material/paginator';
import { Router, ActivatedRoute } from '@angular/router';
import * as signalR from '@microsoft/signalr';
import { Order } from 'src/Modules/order/interfaces/Iorder';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CdkDetailRowDirective } from '../../directives/cdk-detail-row.directive';
import { PagingCriteria } from '../../interfaces/pagingCriteria';
import { PaginatedTableDatasource as PaginatedTableDataSource } from './paginatedTableDatasource';
import { ResponseDto } from '../../interfaces/IResponse.dto';
import { NoteClient } from '../../../note/interfaces/InoteClient';
import { ToastrService } from 'ngx-toastr';

const detailExpandAnimation = trigger('detailExpand', [
  state('void', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
  state('*', style({ height: '*', visibility: 'visible' })),
  transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
]);
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  animations: [detailExpandAnimation],
})
export class TableComponent implements OnInit {
  destroy$ = new Subject<void>();
  displayedColumns!: string[];
  dataSource!: TableDataSource | PaginatedTableDataSource;
  activeSortColumn: string = 'Id';
  connection!: signalR.HubConnection;

  PAGE_SIZE_OPTIONS = [25, 50, 100];
  filteredDataLength = 0;
  _pagingCriteria: PagingCriteria = {
    direction: 'desc',
    filter: '',
    orderBy: 'Id',
    pageIndex: 0,
    pageSize: 25,
  };

  @Output() OnView = new EventEmitter<any>();
  @Output() onClose = new EventEmitter();
  @Output() onTransaction = new EventEmitter<any>();
  @Output() onNotePrint = new EventEmitter<any>();
  @Output() onMarkAsReady = new EventEmitter<any>();

  @ViewChild('paginator', { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;

  @Input() database: any;
  @Input() tableColumns: any;
  @Input() canAdd: boolean = true;
  @Input() toggleShift: boolean = false;
  @Input() canEdit: boolean = true;
  @Input() canDelete: boolean = false;
  @Input() canView: boolean = false;
  @Input() hasTransaction: boolean = false;
  @Input() formName!: FormDialogNames;
  @Input() componentName!: ComponentsName;
  @Input() canNavigateToDetails: boolean = false;
  @Input() canExpand: boolean = false;
  @Input() isPaginated: boolean = false;
  @Input() canMarkOrderDetailAsReady: boolean = false;
  @Input() canPrintNote: boolean = false;
  @Input() canPayBulk: boolean = false;
  @ViewChildren(CdkDetailRowDirective)
  detailRowDirectives!: QueryList<CdkDetailRowDirective>;

  toastrService = inject(ToastrService);

  constructor(public dialog: MatDialog, private _router: Router, private _activatedRoute: ActivatedRoute, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.setPagingCriteria();
    this.displayedColumns = [...this.tableColumns.map((c: any) => c.columnDef), 'actions'];
    this.loadData();

    this.cdRef.detectChanges();
    if (this.componentName == ComponentsName.order) this.connectToOrderHub();
  }

  connectToOrderHub() {
    this.connection = new signalR.HubConnectionBuilder().withUrl(`${environment.host}OrderHub`).withAutomaticReconnect().build();
    this.connection
      .start()
      .then(() => console.log('connected'))
      .catch((err) => console.log(err));

    this.connection.on('add', (res: Order) => {
      (this.database.dataChange.value as ResponseDto).body.push(res);
      this.toastrService.success(`تم تسجيل اوردر جديد بواسطة ${res.createdBy}`);
      this.refreshTable();
    });
  }

  isRowExpanded(rowId: string): boolean {
    if (this.detailRowDirectives) {
      const isExists = this.detailRowDirectives.find((x) => x.isRowExpanded(rowId));
      return isExists ? true : false;
    }
    return false;
  }

  collapseAllRows() {
    this.detailRowDirectives.forEach((x) => x.collapseAllRows());
  }

  public loadData() {
    if (this.isPaginated) {
      this.setPaginatedTableDatasource();
    } else {
      this.setTableDataSource();
    }
  }
  private setPaginatedTableDatasource() {
    this.dataSource = new PaginatedTableDataSource(this.database);
    fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap(() => {
          this.setPagingCriteria();
          return this.database.getPagedData(this._pagingCriteria);
        }),
      )
      .subscribe();
    this.dataSource.filteredDataLength$.subscribe((length) => {
      this.filteredDataLength = length;
    });
  }
  private setTableDataSource() {
    this.dataSource = new TableDataSource(this.database, this.paginator, this.sort);
    this.dataSource.filteredDataLength$.subscribe((length) => {
      this.filteredDataLength = length;
    });
    fromEvent(this.filter.nativeElement, 'keyup').subscribe(() => {
      if (!this.dataSource) return;
      this.dataSource.filter = this.filter.nativeElement.value;
      this.dataSource.filteredDataLength$.subscribe((length) => (this.filteredDataLength = length));
    });
  }

  setActiveSortColumn(column: string): void {
    if (this.isPaginated) {
      this.activeSortColumn = column;
      this.setPagingCriteria();
      this.database.getPagedData(this._pagingCriteria).subscribe();
    }
  }
  clearFilter = () => {
    if (this.isPaginated) {
      this.dataSource.filter = this.filter.nativeElement.value = '';
      this.setPagingCriteria();
      this.database.getPagedData(this._pagingCriteria).subscribe();
    } else {
      this.dataSource.filter = this.filter.nativeElement.value = '';
    }
  };

  async HandleNew() {
    const dialogComponent = await FormHelpers.getAppropriateDialogComponent(this.formName);
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
    const dialogComponent = await FormHelpers.getAppropriateDialogComponent(this.formName);
    const dialogRef = this.dialog.open<any>(dialogComponent, { minWidth: '30%', data: row });
    dialogRef.afterClosed().subscribe({
      complete: () => this.refreshTable(),
    });
  }

  async handleDelete(row: any, $event: any) {
    $event.stopPropagation();
    const deleteDialogComponent = await FormHelpers.getDeleteDialogComponent();
    const dialogRef = this.dialog.open<DeleteDialogComponent>(deleteDialogComponent, { minWidth: '30%', data: { row: row, componentName: this.componentName } });
    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result?.data) {
          this.refreshTable();
        }
      },
    });
  }

  async handleTransaction(row: any, $event: any) {
    $event.stopPropagation();
    let dialogComponent = null;
    if (this.componentName == ComponentsName.commitmentAndDue) {
      dialogComponent = await FormHelpers.getAppropriateDialogComponent(FormDialogNames.commitmentAndDueComponentTransactionFormDialog);
    } else {
      dialogComponent = await FormHelpers.getAppropriateDialogComponent(FormDialogNames.orderTransactionFormDialogComponent);
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
    const dialogComponent = await FormHelpers.getAppropriateDialogComponent(FormDialogNames.orderDetailsDialogComponent);
    const dialogRef = this.dialog.open<any>(dialogComponent, {
      data: row,
      minWidth: '30%',
    });
  }

  navigate(row: any, $event: any) {
    $event.stopPropagation();
    this._router.navigate(['details', row.id], { relativeTo: this._activatedRoute });
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
    const dialogComponent = await FormHelpers.getAppropriateDialogComponent(FormDialogNames.clientBulkPaymentFormDialog);
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

  onPageChange() {
    if (this.isPaginated) {
      this.setPagingCriteria();
      this.database.getPagedData(this._pagingCriteria).subscribe();
    }
  }

  private setPagingCriteria() {
    this._pagingCriteria.direction = this.sort.direction ?? 'desc';
    this._pagingCriteria.filter = this.trimIfBarcode(this.filter.nativeElement.value) ?? '';
    this._pagingCriteria.orderBy = this.activeSortColumn;
    this._pagingCriteria.pageIndex = this.paginator.pageIndex;
    this._pagingCriteria.pageSize = this.paginator.pageSize;
  }

  trimIfBarcode(value: string) {
    const barPrefix = 'bar-';
    const barcodeIndex = value.indexOf(barPrefix) ?? -1;
    if (barcodeIndex === -1) return value;
    const id = value.substring(barPrefix.length);
    return id;
  }

  private refreshTable = () => this.paginator._changePageSize(this.paginator.pageSize);

  getTotal(noteClients: NoteClient[]): number {
    return noteClients.map((t) => t.quantity).reduce((acc, value) => acc + value, 0);
  }
}
