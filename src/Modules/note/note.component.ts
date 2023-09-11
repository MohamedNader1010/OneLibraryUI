import { Component, OnDestroy, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { ComponentsName } from 'src/Modules/shared/enums/components.name.enum';
import { FormDialogNames } from 'src/Modules/shared/enums/forms-name.enum';
import { NoteService } from './services/note.service';
import { Note } from './interfaces/Inote';
import { TableCommonFunctionality } from '../shared/classes/tableCommonFunctionality';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
})
export class NoteComponent extends TableCommonFunctionality implements OnInit, OnDestroy {
  formName = FormDialogNames.NoteFormDialogComponent;
  componentName = ComponentsName.note;

  constructor(private _translateService: TranslateService, httpClient: HttpClient, toastrService: ToastrService, override databaseService: NoteService, public dialog: MatDialog) {
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
        cell: (element: Note) => element.id,
      },
      {
        columnDef: 'barcode',
        header: 'باركود',
        cell: (element: Note) => `bar-${element.id}`,
      },
      {
        columnDef: 'name',
        header: 'الأسم',
        cell: (element: Note) => element.name,
      },
      {
        columnDef: 'teacher',
        header: 'المدرس',
        cell: (element: Note) => element.client,
      },
      {
        columnDef: 'stage',
        header: 'المرحلة',
        cell: (element: Note) => element.stage ?? '-',
      },
      {
        columnDef: 'term',
        header: 'الترم',
        cell: (element: Note) => element.term ?? '-',
      },
      {
        columnDef: 'actualPrice',
        header: 'السعر الفعلي',
        cell: (element: Note) => element.actualPrice,
      },
      {
        columnDef: 'originalPrice',
        header: 'سعر التكلفة',
        cell: (element: Note) => element.originalPrice,
      },
      {
        columnDef: 'earning',
        header: 'الربح',
        cell: (element: Note) => element.earning,
      },
      {
        columnDef: 'teacherPrice',
        header: 'ربح المدرس',
        cell: (element: Note) => element.teacherPrice,
      },
      {
        columnDef: 'finalPrice',
        header: 'السعر النهائي',
        cell: (element: Note) => element.finalPrice,
      },
      {
        columnDef: 'quantity',
        header: 'الكمية',
        cell: (element: Note) => element.quantity,
      },
      {
        columnDef: 'pdf',
        header: 'pdf',
        cell: (element: Note) => element.fileName ?? '-',
      },
    ];
  }
}
