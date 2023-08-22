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

@Component({
	selector: 'app-reservations',
	templateUrl: './reservations.component.html',
	styleUrls: ['./reservations.component.css'],
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({height: '0px', minHeight: '0'})),
			state('expanded', style({height: '*'})),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	],
})
export class ReservationsComponent extends TableCommonFunctionality implements OnInit, OnDestroy {
	reservedOrderDetails: ReservedOrderDetails[] = [];
	tableColumns!: any[];
	displayedColumns!: string[];
	columnsToDisplayWithExpand!: string[];
	dataSource!: TableDataSource;
	expandedElement: any;

	allComplete: boolean = false;

	@ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
	@ViewChild(MatSort, {static: true}) sort!: MatSort;
	@ViewChild('filter', {static: true}) filter!: ElementRef;

	constructor(
		private _order: OrderService,
		private translate: TranslateService,
		public dialog: MatDialog,
		public override database: OrderService,
		public override toastr: ToastrService,
		public override httpClient: HttpClient
	) {
		super(httpClient, toastr, database);
	}

	ngOnInit(): void {
		this.initializeTableColumns();
		this.loadData();
	}
	loadData() {
		this.initializeTableColumns();
		this.displayedColumns = [...this.tableColumns.map((c: any) => c.columnDef)];
		this.columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
		this.dataSource = new TableDataSource(this.database, this.paginator, this.sort);
		this.database.GetReservedOrderDetails();
	}

	private initializeTableColumns() {
		this.tableColumns = [
			{
				columnDef: this.translate.instant('table.id'),
				header: this.translate.instant('table.id.label'),
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
			this.subscriptions.push(
        this._order.markOrderDetailsAsReady(data).subscribe({
          next: (res) => {
            this._order.DialogData = res.body;
            this.toastr.success(res.message);
          },
          error: (e) => {
            let res: Response = e.error ?? e;
            this.toastr.error(res.message);
          },
          complete: () => {
            reservedOrderDetails.reservedNotes.splice(
              reservedOrderDetails.reservedNotes.findIndex((r) => r.noteId === noteId),
              1,
            );
            if (reservedOrderDetails.reservedNotes.length) this.database.dataChange.value.body[this.database.dataChange.value.body.indexOf(reservedOrderDetails)] = reservedOrderDetails;
            else
              this.database.dataChange.value.body.splice(
                this.database.dataChange.value.body.findIndex((x: any) => x.id === reservedOrderDetails.id),
                1,
              );
            this.refreshTable();
          },
        }),
      );
		}
	}
	private refreshTable = () => this.paginator._changePageSize(this.paginator.pageSize);
}
