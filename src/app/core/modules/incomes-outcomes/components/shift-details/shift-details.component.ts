import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ResponseDto } from 'src/app/shared/interfaces/IResponse.dto';
import { TransactionSource } from '../../../../../shared/enums/TransactionSource.emun';
import { TransactionStatus } from '../../../../../shared/enums/TransactionStatus.enum';
import { Attendance } from '../../../../data/project-management/models/attendance.model';
import { IncomeOutcome } from '../../../../data/project-management/models/income-outcome.model';
import { MaterialTracking } from '../../../../data/project-management/models/materialTracking.model';
import { Shift } from '../../../../data/project-management/models/shift.model';
import { IncomesOutcomesService } from '../../../../data/project-management/repositories/Incomes-outcomes.service';
import { AttendanceService } from '../../../../data/project-management/repositories/attendance.service';
import { MaterialTrackingService } from '../../../../data/project-management/repositories/materialTracking.service';
import { ShiftService } from '../../../../data/project-management/repositories/shift.service';

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
    public inOutService: IncomesOutcomesService,
    public matInOutService: MaterialTrackingService,
    private _translateService: TranslateService,
    private _router: Router,
  ) {}

  ngOnInit(): void {
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
        this.inOutService.dataChange.next({ body: this.shift.incomeOutcomes } as ResponseDto);
        this.matInOutService.dataChange.next({ body: this.shift.materialIncomeOutcomes } as ResponseDto);
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
        cell: (element: IncomeOutcome) => element.id,
      },
      {
        columnDef: 'amount',
        header: 'المبلغ',
        cell: (element: IncomeOutcome) => element.amount,
      },
      {
        columnDef: 'status',
        header: 'الحالة',
        cell: (element: IncomeOutcome) => (element.status == TransactionStatus.صادر ? 'صادر' : 'وارد'),
      },
      {
        columnDef: 'source',
        header: 'المصدر',
        cell: (element: IncomeOutcome) => (element.source == TransactionSource.IcoumeOutcome ? 'اليومية' : 'البنك'),
      },
      {
        columnDef: 'comment',
        header: 'ملاحظات',
        cell: (element: IncomeOutcome) => element.comment,
      },
      {
        columnDef: 'createdBy',
        header: 'التسجيل بواسطة',
        cell: (element: IncomeOutcome) => element.createdBy,
      },
      {
        columnDef: 'time-createdOn',
        header: 'وقت التسجيل',
        cell: (element: IncomeOutcome) => element.createdOn,
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
        cell: (element: MaterialTracking) => element.material,
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
