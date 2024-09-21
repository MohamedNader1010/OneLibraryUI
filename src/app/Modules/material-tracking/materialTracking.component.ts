import { Component, inject, OnInit } from '@angular/core';
import { MaterialTracking } from '../../core/data/models/material-transaction/materialTracking';
import { MaterialTrackingService } from '../../core/data/services/material-tracking.service';
import { ComponentsName } from '../../shared/enums/components.name.enum';
import { FormDialogNames } from '../../shared/enums/forms-name.enum';
import { TransactionStatus } from '../../shared/enums/TransactionStatus.enum';
import { TranslateService } from '@ngx-translate/core';
import { TableCommunicationService } from '../../shared/components/table/table-communication.service';
import { getEnumOptions } from '../../shared/utilities/enum.utility';
import { TransactionStatusMapper } from '../../shared/mappers/transaction-status.mapper';

@Component({
  selector: 'app-materialTracking',
  templateUrl: './materialTracking.component.html',
})
export class materialTrackingComponent implements OnInit {
  formName = FormDialogNames.materialTrackingFormDialogComponent;
  componentName = ComponentsName.materialTracking;
  databaseService = inject(MaterialTrackingService);
  tableColumns!: any[];
  tableCommunicationService = inject(TableCommunicationService);
  translateService = inject(TranslateService);

  ngOnInit(): void {
    this.initiateTableHeaders();
    this.loadPaginatedData();
    this.tableCommunicationService.reloadTable$.subscribe(() => this.loadPaginatedData());
  }

  loadPaginatedData = () => {
    this.databaseService.getPagedData().subscribe();
  };

  private initiateTableHeaders() {
    this.tableColumns = [
      {
        columnDef: 'Id',
        header: this.translateService.instant('table.id.label'),
        cell: (element: MaterialTracking) => element.id,
      },
      {
        columnDef: 'Material.Name',
        header: 'أسم الخامة',
        cell: (element: MaterialTracking) => element.name,
      },
      {
        columnDef: 'Quantity',
        header: 'الكمية',
        cell: (element: MaterialTracking) => element.quantity,
      },
      {
        columnDef: 'Status',
        header: 'الحالة',
        cell: (element: MaterialTracking) => TransactionStatusMapper.get(element.status),
        enumOptions: getEnumOptions(TransactionStatus, TransactionStatusMapper),
      },
      {
        columnDef: 'Comment',
        header: 'ملاحظات',
        cell: (element: MaterialTracking) => element.comment,
      },
      {
        columnDef: 'CreatedBy',
        header: 'التسجيل بواسطة',
        cell: (element: MaterialTracking) => element.createdBy,
      },
      {
        columnDef: 'CreatedOn',
        header: 'وقت التسجيل',
        cell: (element: MaterialTracking) => element.createdOn,
      },
    ];
  }
}
