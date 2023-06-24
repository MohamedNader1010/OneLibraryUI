import {Component, OnInit, OnDestroy, ElementRef, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ClientService} from '../../services/client.service';
import { trigger, state, style, transition, animate } from '@angular/animations'
import { HttpClient } from '@angular/common/http'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { TranslateService } from '@ngx-translate/core'
import { ToastrService } from 'ngx-toastr'
import { TableCommonFunctionality } from 'src/Modules/shared/classes/tableCommonFunctionality'
import { TableDataSource } from 'src/Modules/shared/classes/tableDataSource'
import { TeacherProfitResponse } from '../../interFaces/IteacherProfitResponse'
import { PayTeacherProfitComponent } from '../payTeacherProfit/payTeacherProfit.component'
@Component({
	selector: 'app-teacherAccount',
	templateUrl: './teacherAccount.component.html',
	styleUrls: ['./teacherAccount.component.css'],
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({height: '0px', minHeight: '0'})),
			state('expanded', style({height: '*'})),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	],
})
export class TeacherAccountComponent extends TableCommonFunctionality implements OnInit, OnDestroy {
	tableColumns!: any[];
	displayedColumns!: string[];
	columnsToDisplayWithExpand!: string[];
	dataSource!: TableDataSource;
	expandedElement: any;

	@ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
	@ViewChild(MatSort, {static: true}) sort!: MatSort;
	@ViewChild('filter', {static: true}) filter!: ElementRef;

	constructor(
		private translate: TranslateService,
		public dialog: MatDialog,
		public override database: ClientService,
		public override toastr: ToastrService,
		public override httpClient: HttpClient,
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
		this.database.getTeacherProfit();
	}

	private initializeTableColumns() {
		this.tableColumns = [
			{
				columnDef: this.translate.instant('table.id'),
				header: this.translate.instant('table.id.label'),
				cell: (row: TeacherProfitResponse) => row.id,
			},
			{
				columnDef: 'name',
				header: 'الأسم',
				cell: (row: TeacherProfitResponse) => row.name,
			},
			{
				columnDef: 'earning',
				header: 'أجمالي الحساب',
				cell: (row: TeacherProfitResponse) => row.teacherearning,
			},
			{
				columnDef: 'rest',
				header: ' المتبقي',
				cell: (row: TeacherProfitResponse) => row.rest,
			},
		];
	}

  async HandleNew() {
    const dialogRef = this.dialog.open<any>(PayTeacherProfitComponent, {
      minWidth: "30%",
    });
    this.subscriptions.push(
      dialogRef.afterClosed().subscribe({
        next: (result) => {
          // if (result?.data) this.HandleNew();
					console.log(result);
					
        },
      })
    );
  }

	clearFilter = () => (this.dataSource.filter = this.filter.nativeElement.value = '');
}
