import { Component, OnInit, ElementRef, ViewChild, inject } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PayTeacherProfitComponent } from '../payTeacherProfit/payTeacherProfit.component';
import { TeacherProfitResponse } from '../../../../core/data/models/client/IteacherProfitResponse';
import { ClientService } from '../../../../core/data/services/client.service';
import { TableDataSource } from '../../../../shared/components/table/tableDataSource';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
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
export class TeacherAccountComponent implements OnInit {
  displayedColumns!: string[];
  columnsToDisplayWithExpand!: string[];
  dataSource!: TableDataSource;
  expandedElement: any;
  filteredDataLength = 0;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  databaseService = inject(ClientService);
  toastrService = inject(ToastrService);
  tableColumns!: any[];
  translateService = inject(TranslateService);
  public dialog = inject(MatDialog);

  ngOnInit(): void {
    this.initializeTableColumns();
    this.loadData();
    this.dataSource.filteredDataLength$.subscribe((length) => {
      this.filteredDataLength = length;
    });
    // fromEvent(this.filter.nativeElement, 'keyup').subscribe(() => {
    //   if (!this.dataSource) return;
    // this.dataSource.filter = this.filter.nativeElement.value;
    // this.dataSource.filteredDataLength$.subscribe((length) => (this.filteredDataLength = length));
    // });
  }

  loadData() {
    this.displayedColumns = [...this.tableColumns.map((c: any) => c.columnDef)];
    this.columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
    this.dataSource = new TableDataSource(this.databaseService, this.paginator, this.sort);
    this.databaseService.getTeacherProfit();
  }

  private initializeTableColumns() {
    this.tableColumns = [
      {
        columnDef: this.translateService.instant('table.id'),
        header: this.translateService.instant('table.id.label'),
        cell: (row: TeacherProfitResponse) => this.databaseService.data.body.indexOf(row) + 1,
      },
      {
        columnDef: 'name',
        header: 'الأسم',
        cell: (row: TeacherProfitResponse) => row.name,
      },
      {
        columnDef: 'totalForOrders',
        header: 'التعاملات',
        cell: (row: TeacherProfitResponse) => row.totalForOrders,
      },
      {
        columnDef: 'paidForOrders',
        header: 'دفع',
        cell: (row: TeacherProfitResponse) => row.paidForOrders,
      },
      {
        columnDef: 'restForOrders',
        header: 'عليه',
        cell: (row: TeacherProfitResponse) => row.restForOrders,
      },
      {
        columnDef: 'totalEarning',
        header: 'الارباح',
        cell: (row: TeacherProfitResponse) => row.totalEarning,
      },
      {
        columnDef: 'totalCollected',
        header: 'مدفوع للعميل',
        cell: (row: TeacherProfitResponse) => row.totalCollected,
      },
      {
        columnDef: 'totalPending',
        header: 'باقي للعميل',
        cell: (row: TeacherProfitResponse) => row.totalPending,
      },
      {
        columnDef: 'rest',
        header: 'الصافي',
        cell: (row: TeacherProfitResponse) => row.rest,
      },
    ];
  }

  async HandleTeacherPay(row: TeacherProfitResponse, $event: any) {
    $event.stopPropagation();
    const dialogRef = this.dialog.open<any>(PayTeacherProfitComponent, {
      minWidth: '30%',
      data: row,
    });
    dialogRef.afterClosed().subscribe({
      next: (result) => {
        let oldrow = this.databaseService.dataChange.value.body[this.databaseService.dataChange.value.body.findIndex((x: any) => x.id === result.row.id)];
        this.databaseService.dataChange.value.body[this.databaseService.dataChange.value.body.findIndex((x: any) => x.id === result.row.id)] = result.row;
        this.toastrService.success(result.res.message);
      },
    });
  }

  // clearFilter = () => (this.dataSource.filter = this.filter.nativeElement.value = '');
}
