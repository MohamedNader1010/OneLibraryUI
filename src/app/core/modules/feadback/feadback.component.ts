import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ComponentsName } from 'src/app/shared/enums/components.name.enum';
import { FormDialogNames } from 'src/app/shared/enums/forms-name.enum';
import { TableCommonFunctionality } from '../../../shared/classes/tableCommonFunctionality';
import { Feedback } from '../../data/project-management/models/feedback.model';
import { FeedbackService } from '../../data/project-management/repositories/feedback.service';

@Component({
  selector: 'app-feadback',
  templateUrl: './feadback.component.html',
  styleUrls: ['./feadback.component.css'],
})
export class FeadbackComponent extends TableCommonFunctionality implements OnInit, OnDestroy {
  formName = FormDialogNames.feedbackFormDialogComponent;
  componentName = ComponentsName.feedback;

  constructor(httpClient: HttpClient, toastrService: ToastrService, override databaseService: FeedbackService, private _translateService: TranslateService, public dialog: MatDialog) {
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
