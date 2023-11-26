import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ComponentsName } from 'src/app/shared/enums/components.name.enum';
import { FormDialogNames } from 'src/app/shared/enums/forms-name.enum';
import { TableCommonFunctionality } from '../../../shared/classes/tableCommonFunctionality';
import { TransactionStatus } from '../../../shared/enums/TransactionStatus.enum';
import { MaterialTracking } from '../../data/project-management/models/materialTracking.model';
import { MaterialTrackingService } from '../../data/project-management/repositories/materialTracking.service';

@Component({
  selector: 'app-materialTracking',
  templateUrl: './materialTracking.component.html',
  styleUrls: ['./materialTracking.component.css'],
})
export class materialTrackingComponent extends TableCommonFunctionality implements OnInit, OnDestroy {
  formName = FormDialogNames.materialTrackingFormDialogComponent;
  componentName = ComponentsName.materialTracking;

  constructor(httpClient: HttpClient, override databaseService: MaterialTrackingService, private _translateService: TranslateService, toastrService: ToastrService, public dialog: MatDialog) {
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
