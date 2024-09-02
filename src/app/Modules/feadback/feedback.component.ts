import { Component, inject, OnInit } from '@angular/core';
import { Feedback } from '../../core/data/models/feedback/feedback';
import { FeedbackService } from '../../core/data/services/feedback.service';
import { ComponentsName } from '../../shared/enums/components.name.enum';
import { FormDialogNames } from '../../shared/enums/forms-name.enum';
import { TranslateService } from '@ngx-translate/core';
import { TableCommunicationService } from '../../shared/components/table/table-communication.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
})
export class FeedbackComponent implements OnInit {
  formName = FormDialogNames.feedbackFormDialogComponent;
  componentName = ComponentsName.feedback;
  databaseService = inject(FeedbackService);
  tableColumns!: any[];
  tableCommunicationService = inject(TableCommunicationService);
  translateService = inject(TranslateService);

  ngOnInit(): void {
    this.initiateTableHeaders();
    this.loadData();
    this.tableCommunicationService.reloadTable$.subscribe(() => this.loadData());
  }

  loadData() {
    this.databaseService.getAllDataForTable();
  }

  private initiateTableHeaders() {
    this.tableColumns = [
      {
        columnDef: this.translateService.instant('table.id'),
        header: this.translateService.instant('table.id.label'),
        cell: (element: Feedback) => element.id,
      },
      {
        columnDef: 'cleint',
        header: 'أسم العميل',
        cell: (element: Feedback) => element.client,
      },
      {
        columnDef: 'feedBack',
        header: 'التعليق',
        cell: (element: Feedback) => element.feedBack,
      },
      {
        columnDef: 'time-feedBackDate',
        header: 'التاريخ',
        cell: (element: Feedback) => element.feedBackDate,
      },
    ];
  }
}
