// import { Component, OnInit, inject } from '@angular/core';
// import { takeUntil } from 'rxjs';
// import { PayTeacherProfitFormDialogComponent } from '../payTeacherProfit/payTeacherProfit.component';
// import { ClientDetailsDialogComponent } from '../client-details-dialog/client-details-dialog.component';
// import { UnitOfWorkService } from "../../../../core/services/unit-of-work.service";
// import { ListComponentBase } from "../../../../shared/classes/list-component-base.abstract";
// import { TableActionPosition } from "../../../../shared/enums/table-action-position.enum";
// @Component({
//   selector: 'app-teacherAccount',
//   templateUrl: './teacherAccount.component.html',
//   styleUrls: ['./teacherAccount.component.css'],
// })
// export class TeacherAccountComponent extends ListComponentBase implements OnInit {
//   unitOfWorkService = inject(UnitOfWorkService);

//   ngOnInit(): void {
//     this.initiateTableHeaders();
//     this.initializeTableActions();
//     this.tableCommunicationService.reloadTable$
//       .pipe(
//         // switchMap(() => this.unitOfWorkService.client.getTeacherProfit()),
//         takeUntil(this.unsubscribe$),
//       )
//       .subscribe();
//     this.tableCommunicationService.reloadTable$.next();
//   }

//   handlePagination(pagingCriteria: IPagingCriteria) {
//     // this.unitOfWorkService.client.getTeacherProfit(pagingCriteria).subscribe();
//   }

//   initiateTableHeaders() {
//     this.tableColumns = [
//       {
//         columnDef: this.translateService.instant('table.id'),
//         header: this.translateService.instant('table.id.label'),
//         cell: (row: ITeacherProfitWithNotes) => row.clientId,
//       },
//       {
//         columnDef: 'Name',
//         header: 'الأسم',
//         cell: (row: ITeacherProfitWithNotes) => row.name,
//       },
//       {
//         columnDef: 'Total',
//         header: 'التعاملات',
//         cell: (row: ITeacherProfitWithNotes) => row.total,
//       },
//       {
//         columnDef: 'Paid',
//         header: 'دفع',
//         cell: (row: ITeacherProfitWithNotes) => row.paid,
//       },
//       {
//         columnDef: 'Rest',
//         header: 'عليه',
//         cell: (row: ITeacherProfitWithNotes) => row.rest,
//       },
//       {
//         columnDef: 'Earning',
//         header: 'الارباح',
//         cell: (row: ITeacherProfitWithNotes) => row.earning,
//       },
//       {
//         columnDef: 'Collected',
//         header: 'مدفوع للعميل',
//         cell: (row: ITeacherProfitWithNotes) => row.collected,
//       },
//       {
//         columnDef: 'Pending',
//         header: 'باقي للعميل',
//         cell: (row: ITeacherProfitWithNotes) => row.pending,
//       },
//       {
//         columnDef: 'NetCredit',
//         header: 'له',
//         cell: (row: ITeacherProfitWithNotes) => (row.net > 0 ? row.net : 0),
//       },
//       {
//         columnDef: 'NetDebt',
//         header: 'عليه',
//         cell: (row: ITeacherProfitWithNotes) => (row.net < 0 ? Math.abs(row.net) : 0),
//       },
//     ];
//   }

//   initializeTableActions() {
//     this.tableActions = [
//       {
//         condition: (forCurrentYearOnly: boolean, row: ITeacherProfitWithNotes) => true,
//         action: (row: ITeacherProfitWithNotes) => this.onViewDetails(row),
//         tooltip: 'عرض التفاصيل',
//         icon: 'groups',
//         position: TableActionPosition.Row,
//       },
//       {
//         condition: (forCurrentYearOnly: boolean, row: ITeacherProfitWithNotes) => forCurrentYearOnly && row.rest > 0,
//         action: async (row: ITeacherProfitWithNotes) => this.onTeacherPay(row),
//         icon: 'paid',
//         tooltip: 'سداد',
//         position: TableActionPosition.Row,
//       },
//     ];
//   }

//   onTeacherPay(row: ITeacherProfitWithNotes) {
//     const dialogRef = this.matDialog.open<any>(PayTeacherProfitFormDialogComponent, { data: row, minWidth: '30%' });
//     this.matDialogCommunicationService.addDialog(dialogRef);
//     dialogRef
//       .afterClosed()
//       .pipe(takeUntil(this.unsubscribe$))
//       .subscribe({
//         next: () => this.matDialogCommunicationService.removeDialog(dialogRef),
//         complete: () => this.tableCommunicationService.reloadTable$.next(),
//       });
//   }

//   onViewDetails(row: ITeacherProfitWithNotes) {
//     const dialogRef = this.matDialog.open(ClientDetailsDialogComponent, { minWidth: '30%', data: row });
//     this.matDialogCommunicationService.addDialog(dialogRef);
//   }

//   OnDestroy(): void {
//     this.unitOfWorkService.unsubscribe();
//   }
// }
