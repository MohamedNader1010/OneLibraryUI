import {HttpClient} from '@angular/common/http';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Attendance} from './interfaces/attendance';
import {AttendanceService} from './services/attendance.service';
import { FormDialogNames } from 'src/Modules/shared/enums/forms-name.enum';
import { ComponentsName } from 'src/Modules/shared/enums/components.name.enum';
import {TranslateService} from '@ngx-translate/core';
import {TableCommonFunctionality} from '../shared/classes/tableCommonFunctionality';
@Component({
  selector: 'attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css'],
})
export class AttendanceComponent extends TableCommonFunctionality implements OnInit, OnDestroy {
  formName = FormDialogNames.AttendanceFormDialogComponent;
  componentName = ComponentsName.attendance;

  constructor(httpClient: HttpClient, databaseService: AttendanceService, private _translateService: TranslateService, toastrService: ToastrService) {
    super(httpClient, toastrService, databaseService);
  }

  ngOnInit(): void {
    this.initiateTableHeaders();
    this.loadData();
  }
  private initiateTableHeaders() {
    this.tableColumns = [
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
      {
        columnDef: 'formattedDuration',
        header: 'عدد الساعات',
        cell: (element: Attendance) => element.formattedDuration,
      },
    ];
  }
}
