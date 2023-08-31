import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {TableCommonFunctionality} from 'src/Modules/shared/classes/tableCommonFunctionality';
import {ReservedOrderDetails} from '../../interfaces/IreservedOrderDetails';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {TableDataSource} from 'src/Modules/shared/classes/tableDataSource';
import {OrderDetail} from './../../interfaces/IorderDetail';
import {OrderService} from './../../services/orders.service';
import {Status} from '../../Enums/status';
import {Response} from 'src/Modules/shared/interfaces/Iresponse';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ReservationsComponent extends TableCommonFunctionality implements OnInit, OnDestroy {
  reservedOrderDetails: ReservedOrderDetails[] = [];
  displayedColumns!: string[];
  columnsToDisplayWithExpand!: string[];
  dataSource!: TableDataSource;
  expandedElement: any;

  allComplete: boolean = false;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;

  constructor(
    private _orderService: OrderService,
    private _translateService: TranslateService,
    public dialog: MatDialog,
    override databaseService: OrderService,
    toastrService: ToastrService,
    httpClient: HttpClient,
  ) {
    super(httpClient, toastrService, databaseService);
  }

  ngOnInit(): void {
    this.initializeTableColumns();
    this.loadData();
  }
  override loadData() {
    this.displayedColumns = [...this.tableColumns.map((c: any) => c.columnDef)];
    this.columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
    this.dataSource = new TableDataSource(this.databaseService, this.paginator, this.sort);
    this.databaseService.GetReservedOrderDetails();
  }

  private initializeTableColumns() {
    this.tableColumns = [
      {
        columnDef: this._translateService.instant('table.id'),
        header: this._translateService.instant('table.id.label'),
        cell: (row: ReservedOrderDetails) => row.id,
      },
      {
        columnDef: 'createdOn',
        header: 'تاريخ الحجز',
        cell: (row: ReservedOrderDetails) => row.createdOn,
      },
    ];
  }
  clearFilter = () => (this.dataSource.filter = this.filter.nativeElement.value = '');

  handlePrint(reservedOrderDetails: ReservedOrderDetails, noteId: number, data: OrderDetail[]) {
    if (data.length) {
      data.map((od) => (od.orderStatus = Status.جاهز));
      this._orderService
        .markOrderDetailsAsReady(data)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            this._orderService.DialogData = res.body;
            this.toastrService.success(res.message);
          },
          error: (e) => {
            let res: Response = e.error ?? e;
            this.toastrService.error(res.message);
          },
          complete: () => {
            reservedOrderDetails.reservedNotes.splice(
              reservedOrderDetails.reservedNotes.findIndex((r) => r.noteId === noteId),
              1,
            );
            if (reservedOrderDetails.reservedNotes.length) this.databaseService.dataChange.value.body[this.databaseService.dataChange.value.body.indexOf(reservedOrderDetails)] = reservedOrderDetails;
            else
              this.databaseService.dataChange.value.body.splice(
                this.databaseService.dataChange.value.body.findIndex((x: any) => x.id === reservedOrderDetails.id),
                1,
              );
            this.refreshTable();
          },
        });
    }
  }
  private refreshTable = () => this.paginator._changePageSize(this.paginator.pageSize);
}
