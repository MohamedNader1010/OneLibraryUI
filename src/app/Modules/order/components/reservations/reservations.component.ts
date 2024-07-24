import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PrintNote } from '../../../../core/data/models/note/Iprint-note.interface';
import { Reservation } from '../../../../core/data/models/order/IReservation.interface';
import { ReservedNote } from '../../../../core/data/models/order/IReservedNote.interface';
import { ReservedOrderDetail } from '../../../../core/data/models/order/IReservedOrderDetail.interface';
import { NoteService } from '../../../../core/data/services/note.service';
import { OrderService } from '../../../../core/data/services/orders.service';
import { TableDataSource } from '../../../../shared/components/table/tableDataSource';
import { OrderDetailStatus } from '../../../../shared/enums/OrderDetailStatus.enum';
import { TranslateService } from '@ngx-translate/core';
import { TableCommunicationService } from '../../../../shared/components/table/table-communication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ReservationsComponent implements OnInit {
  reservations: Reservation[] = [];
  displayedColumns!: string[];
  columnsToDisplayWithExpand!: string[];
  dataSource!: TableDataSource;
  expandedElement: any;
  tableColumns!: any[];
  tableCommunicationService = inject(TableCommunicationService);
  translateService = inject(TranslateService);
  toastrService = inject(ToastrService);

  allComplete: boolean = false;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;

  databaseService = inject(OrderService);
  _noteService = inject(NoteService);

  ngOnInit(): void {
    this.initializeTableColumns();
    this.loadData();
  }
  loadData() {
    this.displayedColumns = [...this.tableColumns.map((c: any) => c.columnDef)];
    this.columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
    this.dataSource = new TableDataSource(this.databaseService, this.paginator, this.sort);
    this.databaseService.GetReservedOrderDetails();
  }

  private initializeTableColumns() {
    this.tableColumns = [
      {
        columnDef: this.translateService.instant('table.id'),
        header: this.translateService.instant('table.id.label'),
        cell: (row: Reservation) => row.id,
      },
      {
        columnDef: 'createdOn',
        header: 'تاريخ الحجز',
        cell: (row: Reservation) => row.createdOn,
      },
    ];
  }
  clearFilter = () => (this.dataSource.filter = this.filter.nativeElement.value = '');

  handleReadyOrderDetail = (reservation: Reservation, data: ReservedOrderDetail, $event: any) => {
    $event.stopPropagation();
    data.orderStatus = OrderDetailStatus.جاهز;
    this.databaseService.MarkSingleOrderDetailAsReady(data).subscribe({
      next: (res) => {
        this.toastrService.success(res.message);
      },
      complete: () => {
        const reservedNote = reservation.reservedNotes.find((note: ReservedNote) => note.noteId === data.noteId);
        const reservedNoteIndex = reservation.reservedNotes.findIndex((note: ReservedNote) => note.noteId === data.noteId);
        if (reservedNote) {
          const detailIndex = reservedNote.orderDetails.findIndex((detail) => detail.id === data.id);
          reservedNote.noteQuantity -= data.quantity;
          reservedNote.orderDetails.splice(detailIndex, 1);
          if (reservedNote.orderDetails.length) reservation.reservedNotes[reservedNoteIndex] = reservedNote;
          else reservation.reservedNotes.splice(reservedNoteIndex, 1);
          this.updateTableData(reservation);
          return;
        }
      },
    });
  };

  handleNotePrint = (reservation: Reservation, data: ReservedOrderDetail, $event: any) => {
    $event.stopPropagation();
    let model: PrintNote = {
      id: data.noteId,
      quantity: data.quantity,
    };
    this._noteService.printNote(model).subscribe({
      next: (res) => {
        this.toastrService.success(res.message);
      },
      complete: () => {
        const reservedNote = reservation.reservedNotes.find((note: ReservedNote) => note.noteId === data.noteId);
        const reservedNoteIndex = reservation.reservedNotes.findIndex((note: ReservedNote) => note.noteId === data.noteId);
        if (reservedNote) {
          reservedNote.noteQuantity += data.quantity;
          reservation.reservedNotes[reservedNoteIndex] = reservedNote;
          this.updateTableData(reservation);
          return;
        }
      },
    });
  };

  // handlePrint(reservation: Reservation, noteId: number, data: ReservedOrderDetail[]) {
  //   if (data.length) {
  //     data.map((od) => (od.orderStatus = OrderDetailStatus.جاهز));
  //     this.databaseService
  //       .markOrderDetailsAsReady(data)
  //       .pipe(takeUntil(this.destroy$))
  //       .subscribe({
  //         next: (res) => {
  //           this.databaseService.DialogData = res.body;
  //           this.toastrService.success(res.message);
  //         },
  //         complete: () => {
  //           const reservedNoteIndex = reservation.reservedNotes.findIndex((r) => r.noteId === noteId);
  //           reservation.reservedNotes.splice(reservedNoteIndex, 1);
  //           this.updateTableData(reservation);
  //         },
  //       });
  //   }
  // }

  private updateTableData(reservation: Reservation) {
    const reservationIndex = this.databaseService.dataChange.value.body.findIndex((x: any) => x.id === reservation.id);
    if (reservation.reservedNotes.length) this.databaseService.dataChange.value.body[reservationIndex] = reservation;
    else this.databaseService.dataChange.value.body.splice(reservationIndex, 1);
    this.refreshTable();
  }

  private refreshTable = () => this.paginator._changePageSize(this.paginator.pageSize);
}
