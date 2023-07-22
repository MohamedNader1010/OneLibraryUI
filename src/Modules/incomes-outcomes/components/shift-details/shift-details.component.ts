import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ShiftService } from "../../services/shift.service";
import { Shift } from "../../interFaces/Ishift";
import { IncomeOutcomeStatus } from "../../../../Persistents/enums/IncomeOutcome.enum";
import { IncomeOutcomeSource } from "../../../../Persistents/enums/IncomeOutcomeSource.emun";
import { IncomeOutcome } from "../../interFaces/Iincome-outcome";
import { TranslateService } from "@ngx-translate/core";
import { Attendance } from "../../../attendance/interfaces/attendance";
import { MaterialTracking } from "../../../material-tracking/interfaces/materialTracking";
import { AttendanceService } from "../../../attendance/services/attendance.service";
import { IncomesOutcomesService } from "../../services/Incomes-outcomes.service";
import { MaterialTrackingService } from "../../../material-tracking/services/materialTracking.service";

@Component({
  selector: 'app-shift-details',
  templateUrl: './shift-details.component.html',
  styleUrls: ['./shift-details.component.css']
})
export class ShiftDetailsComponent implements OnInit{
  id!: any;
  shift!:Shift;
  attendanceTableColumns!: any[];
  inOutTableColumns!: any[];
  matInOutTableColumns!: any[];
  constructor(private route: ActivatedRoute,
    public shiftService: ShiftService,
    public attendanceService: AttendanceService,
    public inOutService: IncomesOutcomesService,
    public matInOutService: MaterialTrackingService,
    private translate: TranslateService
    ) { }

  ngOnInit(): void {
    this.initiateTableHeaders();
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) this.loadShiftData();
  }

  loadShiftData(){
    this.shiftService.GetById(+this.id).subscribe(
    {
      next:(res)=>{
        this.shift=res.body;
      },
      complete:()=>{
        this.attendanceService.dataChange.next(this.shift.attendance);
        this.inOutService.dataChange.next(this.shift.incomeOutcomes);
        this.matInOutService.dataChange.next(this.shift.materialIncomeOutcomes);
      }
    })
  }

	private initiateTableHeaders() {
		this.attendanceTableColumns =  [
			{
				columnDef: this.translate.instant('table.id'),
				header: this.translate.instant('table.id.label'),
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
				columnDef: this.translate.instant('table.id'),
				header: this.translate.instant('table.id.label'),
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
				cell: (element: IncomeOutcome) => (element.status == IncomeOutcomeStatus.صادر ? 'صادر' : 'وارد'),
			},
			{
				columnDef: 'source',
				header: 'المصدر',
				cell: (element: IncomeOutcome) => (element.source == IncomeOutcomeSource.IcoumeOutcome ? 'اليومية' : 'البنك'),
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
				columnDef: this.translate.instant('table.id'),
				header: this.translate.instant('table.id.label'),
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
				cell: (element: MaterialTracking) => (element.status == IncomeOutcomeStatus.صادر ? 'صادر' : 'وارد'),
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
