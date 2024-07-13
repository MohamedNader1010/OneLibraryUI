import { Component, OnInit, inject } from '@angular/core';
import { Attendance } from './interfaces/attendance';
import { AttendanceService } from './services/attendance.service';
import { FormDialogNames } from 'src/Modules/shared/enums/forms-name.enum';
import { ComponentsName } from 'src/Modules/shared/enums/components.name.enum';
import { TableCommonFunctionality } from '../shared/components/table/tableCommonFunctionality';
@Component({
  selector: 'attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css'],
})
export class AttendanceComponent extends TableCommonFunctionality implements OnInit {
  formName = FormDialogNames.AttendanceFormDialogComponent;
  componentName = ComponentsName.attendance;
  override databaseService = inject(AttendanceService);

  ngOnInit(): void {
    this.initiateTableHeaders();
    this.loadData();
    this.tableCommunicationService.reloadTable$.subscribe(() => this.loadData());
  }
  private initiateTableHeaders() {
    this.tableColumns = [
      {
        columnDef: this.translateService.instant('table.id'),
        header: this.translateService.instant('table.id.label'),
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
      {
        columnDef: 'formattedDuration',
        header: 'عدد الساعات',
        cell: (element: Attendance) => element.formattedDuration,
      },
      {
        columnDef: 'formattedWorkingHours',
        header: 'عدد ساعات العمل',
        cell: (element: Attendance) => element.formattedWorkingHours,
      },
      {
        columnDef: 'formattedOverTime',
        header: 'عدد ساعات الوقت الاضافي',
        cell: (element: Attendance) => element.formattedOverTime,
      },
    ];
  }
}
