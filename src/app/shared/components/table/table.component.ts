import { Component, Input, OnInit, ViewChild, QueryList, ViewChildren, inject } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Subject, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';
import { TableDataSource } from './tableDataSource';
import { environment } from '../../../../environments/environment';
import * as signalR from '@microsoft/signalr';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CdkDetailRowDirective } from '../../directives/cdk-detail-row.directive';
import { IPagingCriteria } from '../../../core/data/interfaces/paging-criteria.interface';
import { PaginatedTableDataSource as PaginatedTableDataSource } from './paginatedTableDatasource';
import { ResponseDto } from '../../interfaces/response.dto';
import { ToastrService } from 'ngx-toastr';
import { NoteClient } from '../../../core/data/models/note/InoteClient';
import { Order } from '../../../core/data/models/order/Iorder';
import { ComponentsName } from '../../enums/components.name.enum';
import { BaseTableActions } from './base-table-actions.class';

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
export class TableComponent extends BaseTableActions implements OnInit {
  destroy$ = new Subject<void>();
  displayedColumns!: string[];
  dataSource!: TableDataSource | PaginatedTableDataSource;
  activeSortColumn: string = 'Id';
  connection!: signalR.HubConnection;

  PAGE_SIZE_OPTIONS = [25, 50, 100];
  filteredDataLength = 0;

  _pagingCriteria: IPagingCriteria = {
    direction: 'desc',
    filters: {},
    orderBy: 'Id',
    pageIndex: 0,
    pageSize: 25,
  };
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  filterColumns!: string[];

  @Input() tableColumns: any;
  @Input() isPaginated: boolean = false;
  @ViewChildren(CdkDetailRowDirective)
  detailRowDirectives!: QueryList<CdkDetailRowDirective>;

  toastrService = inject(ToastrService);
  filters: { [key: string]: string } = {};
  #filterSubject = new Subject<any>();

  ngOnInit(): void {
    this.#setPagingCriteria();
    this.displayedColumns = [...this.tableColumns.map((c: any) => 'header_' + c.columnDef), 'header_actions'];
    this.filterColumns = [...this.tableColumns.map((c: any) => c.columnDef), 'actions'];
    this.tableColumns = this.tableColumns.map((c: any) => ({ ...c, filterValue: '' }));
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
      var currentData = (this.database.dataChange.value as ResponseDto).body as Order[];
      if (!currentData.filter((d) => d.id === res.id)) {
        currentData.push(res);
        this.toastrService.success(`تم تسجيل طلب جديد بواسطة ${res.createdBy}`);
        this.refreshTable();
      }
    });
  }

  isRowExpanded(rowId: string): boolean {
    if (this.detailRowDirectives) {
      const isExists = this.detailRowDirectives.find((x) => x.isRowExpanded(rowId));
      return isExists ? true : false;
    }
    return false;
  }

  collapseAllRows = () => this.detailRowDirectives.forEach((x) => x.collapseAllRows());

  public loadData() {
    if (this.isPaginated) {
      this.setPaginatedTableDataSource();
    } else {
      this.setTableDataSource();
    }
  }
  private setPaginatedTableDataSource() {
    this.dataSource = new PaginatedTableDataSource(this.database);
    this.#filterSubject
      .pipe(
        debounceTime(700),
        distinctUntilChanged(),
        switchMap(() => {
          this.#setPagingCriteria();
          this.database.loadingData.next(true);
          this._pagingCriteria.pageIndex = 0;
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
    this.#filterSubject
      .pipe(
        debounceTime(700),
        distinctUntilChanged(),
        tap(() => {
          this.database.loadingData.next(true);
          if (!this.dataSource) return;
          (this.dataSource as TableDataSource).filters = this.filters;
          this.database.loadingData.next(false);
        }),
        switchMap(() => this.dataSource.filteredDataLength$),
      )
      .subscribe((length) => (this.filteredDataLength = length));
  }

  setActiveSortColumn(column: string): void {
    if (this.isPaginated) {
      this.activeSortColumn = column;
      this.#setPagingCriteria();
      this.database.getPagedData(this._pagingCriteria).subscribe();
    }
  }

  onPageChange() {
    if (this.isPaginated) {
      this.#setPagingCriteria();
      this.database.loadingData.next(true);
      this.database.getPagedData(this._pagingCriteria).subscribe({
        complete: () => (this.database.isLoading = false),
      });
    }
  }

  #setPagingCriteria() {
    this._pagingCriteria.direction = this.sort.direction ?? 'desc';
    this._pagingCriteria.filters = this.filters;
    this._pagingCriteria.orderBy = this.activeSortColumn;
    this._pagingCriteria.pageIndex = this.paginator.pageIndex;
    this._pagingCriteria.pageSize = this.paginator.pageSize;
  }

  trimIfBarcode(value: string) {
    const barPrefix = 'bar-';
    return (value.indexOf(barPrefix) ?? -1) === -1 ? value : value.substring(barPrefix.length);
  }

  getTotal(noteClients: NoteClient[]): number {
    return noteClients.map((t) => t.quantity).reduce((acc, value) => acc + value, 0);
  }

  handleColumnFilter(event: Event, columnDef: string) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    const column = this.tableColumns.find((col: any) => col.columnDef === columnDef);
    if (column) {
      column.filterValue = filterValue;
      column.filterValue ? (this.filters[column.columnDef] = this.trimIfBarcode(column.filterValue)) : delete this.filters[column.columnDef];
      this.#filterSubject.next(column.filterValue);
    }
  }

  clearAllFilters() {
    this.tableColumns.forEach((column: any) => (column.filterValue = ''));
    this.filters = {};
    this.#filterSubject.next(null);
  }
}
