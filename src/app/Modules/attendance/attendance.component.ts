import { Component, OnInit, inject } from '@angular/core';
import { Attendance } from '../../core/data/models/attendance/attendance';
import { AttendanceService } from '../../core/data/services/attendance.service';
import { ComponentsName } from '../../shared/enums/components.name.enum';
import { FormDialogNames } from '../../shared/enums/forms-name.enum';
import { TranslateService } from '@ngx-translate/core';
import { TableCommunicationService } from '../../shared/components/table/table-communication.service';
@Component({
  selector: 'attendance',
  templateUrl: './attendance.component.html',
})
export class AttendanceComponent implements OnInit {
  formName = FormDialogNames.AttendanceFormDialogComponent;
  componentName = ComponentsName.attendance;
  tableColumns!: any[];

  databaseService = inject(AttendanceService);
  #tableCommunicationService = inject(TableCommunicationService);
  #translateService = inject(TranslateService);

  loadData() {
    this.databaseService.getAllDataForTable();
  }

  ngOnInit(): void {
    this.initiateTableHeaders();
    this.loadData();
    this.#tableCommunicationService.reloadTable$.subscribe(() => this.loadData());
  }

  private initiateTableHeaders() {
    this.tableColumns = [
      {
        columnDef: "Id",
        header: this.#translateService.instant('table.id.label'),
        cell: (element: Attendance) => element.id,
      },
      {
        // i will use first name only until handle it.
        columnDef: 'FirstName', // this is a concatenated columns [first name and last name]
        header: 'أسم الموظف',
        cell: (element: Attendance) => element.employee,
      },
      {
        columnDef: 'CheckIn',
        header: 'حضور',
        cell: (element: Attendance) => element.checkIn,
      },
      {
        columnDef: 'CheckOut',
        header: 'انصراف',
        cell: (element: Attendance) => element.checkOut,
      },
      {
        columnDef: 'formattedDuration', // this is computed property..
        header: 'عدد الساعات',
        cell: (element: Attendance) => element.formattedDuration,
      },
      {
        columnDef: 'formattedWorkingHours', // this is computped property..
        header: 'عدد ساعات العمل',
        cell: (element: Attendance) => element.formattedWorkingHours,
      },
      {
        columnDef: 'formattedOverTime', // this is computed property..
        header: 'وقت إضافي / غير مكتمل',
        cell: (element: Attendance) => element.formattedOverTime,
      },
    ];
  }
}
