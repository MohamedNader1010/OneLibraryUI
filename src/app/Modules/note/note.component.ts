import { Component, inject, OnInit } from '@angular/core';
import { Note } from '../../core/data/models/note/Inote';
import { NoteService } from '../../core/data/services/note.service';
import { ComponentsName } from '../../shared/enums/components.name.enum';
import { FormDialogNames } from '../../shared/enums/forms-name.enum';
import { TranslateService } from '@ngx-translate/core';
import { TableCommunicationService } from '../../shared/components/table/table-communication.service';
import { PagingCriteria } from '../../shared/interfaces/pagingCriteria';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
})
export class NoteComponent implements OnInit {
  formName = FormDialogNames.NoteFormDialogComponent;
  componentName = ComponentsName.note;
  databaseService = inject(NoteService);
  tableColumns!: any[];
  tableCommunicationService = inject(TableCommunicationService);
  translateService = inject(TranslateService);

  ngOnInit(): void {
    this.initiateTableHeaders();
    this.loadPaginatedData();
    this.tableCommunicationService.reloadTable$.subscribe(() => this.loadPaginatedData());
  }

  loadPaginatedData = () => {
    const pagingCriteria: PagingCriteria = {
      direction: 'desc',
      filter: '',
      orderBy: 'Id',
      pageIndex: 0,
      pageSize: 25,
    };
    this.databaseService.getPagedData(pagingCriteria).subscribe();
  };

  private initiateTableHeaders() {
    this.tableColumns = [
      {
        columnDef: this.translateService.instant('table.id'),
        header: this.translateService.instant('table.id.label'),
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
