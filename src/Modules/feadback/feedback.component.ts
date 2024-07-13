import { Component, inject, OnInit } from '@angular/core';
import { ComponentsName } from 'src/Modules/shared/enums/components.name.enum';
import { FormDialogNames } from 'src/Modules/shared/enums/forms-name.enum';
import { FeedbackService } from './services/feedback.service';
import { Feedback } from './interfaces/feedback';
import { TableCommonFunctionality } from '../shared/components/table/tableCommonFunctionality';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
})
export class FeedbackComponent extends TableCommonFunctionality implements OnInit {
  formName = FormDialogNames.feedbackFormDialogComponent;
  componentName = ComponentsName.feedback;
  override databaseService = inject(FeedbackService);

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
        cell: (element: Feedback) => element.id,
      },
      {
        columnDef: 'cleint',
        header: 'أسم العميل',
        cell: (element: Feedback) => element.cleint,
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
