import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Attendance } from '../../../../core/data/models/attendance/attendance';
import { MaterialTracking } from '../../../../core/data/models/material-transaction/materialTracking';
import { Transaction } from '../../../../core/data/models/money-transaction/ITransaction';
import { Shift } from '../../../../core/data/models/shift/Ishift';
import { AttendanceService } from '../../../../core/data/services/attendance.service';
import { MoneyTransactionService } from '../../../../core/data/services/money-transaction.service';
import { MaterialTrackingService } from '../../../../core/data/services/material-tracking.service';
import { ShiftService } from '../../../../core/data/services/shift.service';
import { TransactionSource } from '../../../../shared/enums/TransactionSource.emun';
import { TransactionStatus } from '../../../../shared/enums/TransactionStatus.enum';
import { ResponseDto } from '../../../../shared/interfaces/response.dto';

@Component({
  selector: 'app-shift-details',
  templateUrl: './shift-details.component.html',
  styleUrls: ['./shift-details.component.css'],
})
export class ShiftDetailsComponent implements OnInit {
  shift!: Shift;
  attendanceTableColumns!: any[];
  inOutTableColumns!: any[];
  matInOutTableColumns!: any[];
  constructor(
    private _route: ActivatedRoute,
    public shiftService: ShiftService,
    public attendanceService: AttendanceService,
    public inOutService: MoneyTransactionService,
    public matInOutService: MaterialTrackingService,
    private _translateService: TranslateService,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    console.log('test');
    this.initiateTableHeaders();
    let id = this._route.snapshot.paramMap.get('id');
    if (id) this.loadShiftData(+id);
  }

  loadShiftData(id: number) {
    this.shiftService.GetShiftDetails(id).subscribe({
      next: (res) => {
        this.shift = res.body;
      },
      error: () => {
        this._router.navigateByUrl(this._route.snapshot.url.toString());
      },
      complete: () => {
        this.attendanceService.dataChange.next({ body: this.shift.attendances } as ResponseDto);
        this.inOutService.dataChange.next({ body: this.shift.transactions } as ResponseDto);
        this.matInOutService.dataChange.next({ body: this.shift.materialTransactions } as ResponseDto);
      },
    });
  }

  private initiateTableHeaders() {
    this.attendanceTableColumns = [
      {
        columnDef: this._translateService.instant('table.id'),
        header: this._translateService.instant('table.id.label'),
        cell: (element: Attendance) => element.id,
      },
      {
        columnDef: 'name',
        header: 'أسم الموظف',
        cell: (element: Attendance) => element.employee,
      },
      {
        columnDef: 'time-in',
        header: 'حضور',
        cell: (element: Attendance) => element.checkIn,
      },
      {
        columnDef: 'time-out',
        header: 'انصراف',
        cell: (element: Attendance) => element.checkOut,
      },
    ];
    this.inOutTableColumns = [
      {
        columnDef: this._translateService.instant('table.id'),
        header: this._translateService.instant('table.id.label'),
        cell: (element: Transaction) => element.id,
      },
      {
        columnDef: 'amount',
        header: 'المبلغ',
        cell: (element: Transaction) => element.amount,
      },
      {
        columnDef: 'status',
        header: 'الحالة',
        cell: (element: Transaction) => (element.status == TransactionStatus.صادر ? 'صادر' : 'وارد'),
      },
      {
        columnDef: 'source',
        header: 'المصدر',
        cell: (element: Transaction) => (element.source == TransactionSource.daily ? 'اليومية' : 'البنك'),
      },
      {
        columnDef: 'comment',
        header: 'ملاحظات',
        cell: (element: Transaction) => element.comment,
      },
      {
        columnDef: 'createdBy',
        header: 'التسجيل بواسطة',
        cell: (element: Transaction) => element.createdBy,
      },
      {
        columnDef: 'time-createdOn',
        header: 'وقت التسجيل',
        cell: (element: Transaction) => element.createdOn,
      },
    ];
    this.matInOutTableColumns = [
      {
        columnDef: this._translateService.instant('table.id'),
        header: this._translateService.instant('table.id.label'),
        cell: (element: MaterialTracking) => element.id,
      },
      {
        columnDef: 'material',
        header: 'أسم الخامة',
        cell: (element: MaterialTracking) => element.name,
      },
      {
        columnDef: 'quantity',
        header: 'الكمية',
        cell: (element: MaterialTracking) => element.quantity,
      },
      {
        columnDef: 'status',
        header: 'الحالة',
        cell: (element: MaterialTracking) => (element.status == TransactionStatus.صادر ? 'صادر' : 'وارد'),
      },
      {
        columnDef: 'comment',
        header: 'ملاحظات',
        cell: (element: MaterialTracking) => element.comment,
      },
      {
        columnDef: 'createdBy',
        header: 'التسجيل بواسطة',
        cell: (element: MaterialTracking) => element.createdBy,
      },
      {
        columnDef: 'time-createdOn',
        header: 'وقت التسجيل',
        cell: (element: MaterialTracking) => element.createdOn,
      },
    ];
  }
}
