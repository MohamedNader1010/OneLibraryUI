import {trigger, state, style, transition, animate} from '@angular/animations';
import {HttpClient} from '@angular/common/http';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {TableCommonFunctionality} from 'src/Modules/shared/classes/tableCommonFunctionality';
import {OrderService} from '../../services/orders.service';
import {ReservedNotes, ReservedOrderDetails} from '../../interfaces/IreservedOrderDetails';
import {OrderDetail} from '../../interfaces/IorderDetail';

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
	tableColumns!: any[];
	reservedOrderDetails: ReservedOrderDetails[] = [];
	constructor(private translate: TranslateService, public dialog: MatDialog, public override database: OrderService, public override toastr: ToastrService, public override httpClient: HttpClient) {
		super(httpClient, toastr, database);
	}

	ngOnInit(): void {
		this.initializeTableColumns();
		this.loadData();
	}

	private initializeTableColumns() {
		this.tableColumns = [
			{
				columns: [
					{
						columnDef: this.translate.instant('table.id'),
						header: this.translate.instant('table.id.label'),
						cell: (row: ReservedOrderDetails) => row.id,
					},
					{
						columnDef: 'createdOn',
						header: 'تاريخ الحجز',
						cell: (row: ReservedOrderDetails) => new Date(row.createdOn).toLocaleDateString(),
					},
				],
				expands: [
					{
						columns: [
							{
								columnDef: 'noteId',
								header: 'noteId',
								cell: (row: ReservedNotes) => row.noteId,
							},
							{
								columnDef: 'note',
								header: 'note',
								cell: (row: ReservedNotes) => row.note,
							},
							{
								columnDef: 'totalQuantity',
								header: 'totalQuantity',
								cell: (row: ReservedNotes) => row.totalQuantity,
							},
						],
						childs: [
							{
								columns: [
									{
										columnDef: Math.random().toString(),
										header: 'id',
										cell: (row: OrderDetail) => row.id,
									},
									{
										columnDef: 'orderId',
										header: 'orderId',
										cell: (row: OrderDetail) => row.orderId,
									},
									{
										columnDef: 'quantity',
										header: 'quantity',
										cell: (row: OrderDetail) => row.quantity,
									},
								],
							},
						],
					},
				],
			},
		];
	}

	loadData() {
		this.database.GetReservedOrderDetails();
	}
}
