import { Component, inject, OnInit } from '@angular/core';
import { ComponentsName } from 'src/Modules/shared/enums/components.name.enum';
import { FormDialogNames } from 'src/Modules/shared/enums/forms-name.enum';
import { MaterialTracking } from './interfaces/materialTracking';
import { MaterialTrackingService } from './services/materialTracking.service';
import { TableCommonFunctionality } from '../shared/components/table/tableCommonFunctionality';
import { TransactionStatus } from '../shared/enums/TransactionStatus.enum';

@Component({
  selector: 'app-materialTracking',
  templateUrl: './materialTracking.component.html',
  styleUrls: ['./materialTracking.component.css'],
})
export class materialTrackingComponent extends TableCommonFunctionality implements OnInit {
  formName = FormDialogNames.materialTrackingFormDialogComponent;
  componentName = ComponentsName.materialTracking;
  override databaseService = inject(MaterialTrackingService);

  ngOnInit(): void {
    this.initiateTableHeaders();
    this.loadPaginatedData();
    this.tableCommunicationService.reloadTable$.subscribe(() => this.loadPaginatedData());
  }

  private initiateTableHeaders() {
    this.tableColumns = [
      {
        columnDef: this.translateService.instant('table.id'),
        header: this.translateService.instant('table.id.label'),
        cell: (element: MaterialTracking) => element.id,
      },
      {
        columnDef: 'name',
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
