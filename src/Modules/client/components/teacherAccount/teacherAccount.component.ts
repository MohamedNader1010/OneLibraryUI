import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClientService } from '../../services/client.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { TableCommonFunctionality } from 'src/Modules/shared/classes/tableCommonFunctionality';
import { TableDataSource } from 'src/Modules/shared/classes/tableDataSource';
import { TeacherProfitResponse } from '../../interFaces/IteacherProfitResponse';
import { PayTeacherProfitComponent } from '../payTeacherProfit/payTeacherProfit.component';
import { fromEvent, takeUntil } from 'rxjs';
@Component({
  selector: 'app-teacherAccount',
  templateUrl: './teacherAccount.component.html',
  styleUrls: ['./teacherAccount.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TeacherAccountComponent extends TableCommonFunctionality implements OnInit, OnDestroy {
  displayedColumns!: string[];
  columnsToDisplayWithExpand!: string[];
  dataSource!: TableDataSource;
  expandedElement: any;
  filteredDataLength = 0;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;

  constructor(private _translateService: TranslateService, public dialog: MatDialog, override databaseService: ClientService, toastrService: ToastrService, httpClient: HttpClient) {
    super(httpClient, toastrService, databaseService);
  }

  ngOnInit(): void {
    this.initializeTableColumns();
    this.loadData();
    this.dataSource.filteredDataLength$.pipe(takeUntil(this.destroy$)).subscribe((length) => {
      this.filteredDataLength = length;
    });
    fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (!this.dataSource) return;
        this.dataSource.filter = this.filter.nativeElement.value;
        this.dataSource.filteredDataLength$.subscribe((length) => (this.filteredDataLength = length));
      });
  }

  override loadData() {
    this.displayedColumns = [...this.tableColumns.map((c: any) => c.columnDef)];
    this.columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
    this.dataSource = new TableDataSource(this.databaseService, this.paginator, this.sort);
    this.databaseService.getTeacherProfit();
  }

  private initializeTableColumns() {
    this.tableColumns = [
      {
        columnDef: this._translateService.instant('table.id'),
        header: this._translateService.instant('table.id.label'),
        cell: (row: TeacherProfitResponse) => this.databaseService.data.body.indexOf(row) + 1,
      },
      {
        columnDef: 'name',
        header: 'الأسم',
        cell: (row: TeacherProfitResponse) => row.name,
      },
      {
        columnDef: 'totalEarning',
        header: 'أجمالي الارباح',
        cell: (row: TeacherProfitResponse) => row.totalEarning,
      },
      {
        columnDef: 'paidToTeacher',
        header: 'مدفوع للعميل',
        cell: (row: TeacherProfitResponse) => row.paidToTeacher,
      },
      {
        columnDef: 'ordersRest',
        header: 'باقي علي العميل',
        cell: (row: TeacherProfitResponse) => row.ordersRest,
      },
      {
        columnDef: 'rest',
        header: 'المتبقي للعميل',
        cell: (row: TeacherProfitResponse) => row.rest,
      },
    ];
  }

  async HandleTecherPay(row: TeacherProfitResponse, $event: any) {
    $event.stopPropagation();
    const dialogRef = this.dialog.open<any>(PayTeacherProfitComponent, {
      minWidth: '30%',
      data: row,
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result) => {
          this.databaseService.dataChange.value.body[this.databaseService.dataChange.value.body.findIndex((x: any) => x.id === result.row.id)] = result.row;
          this.toastrService.success(result.res.message);
        },
      });
  }

  clearFilter = () => (this.dataSource.filter = this.filter.nativeElement.value = '');
}
