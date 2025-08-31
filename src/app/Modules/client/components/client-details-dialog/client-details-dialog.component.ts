// import { Component, inject, OnDestroy, OnInit } from '@angular/core';
// import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { Subject } from 'rxjs';
// import { UnitOfWorkService } from '../../../../core/services/unit-of-work.service';
// import { MatDialogCommunicationService } from '../../../../shared/services/mat-dialog-communication.service';

// @Component({
//     selector: 'app-client-details-dialog',
//     templateUrl: './client-details-dialog.component.html',
//     styleUrls: ['./client-details-dialog.component.css']
// })
// export class ClientDetailsDialogComponent implements OnInit, OnDestroy {
//     matDialogCommunicationService = inject(MatDialogCommunicationService);
//     teacherProfit: ITeacherProfitWithNotes = inject(MAT_DIALOG_DATA);
//     unitOfWorkService = inject(UnitOfWorkService);

//     clientWithProfit!: ITeacherProfitWithNotes;
//     unsubscribe$ = new Subject<void>();
//     isLoading = true;

//     ngOnInit() {
//         // this.unitOfWorkService.client
//         //   .getTeacherProfitById(this.teacherProfit.clientId)
//         //   .pipe(
//         //     takeUntil(this.unsubscribe$),
//         //     finalize(() => (this.isLoading = false)),
//         //   )
//         //   .subscribe({
//         //     next: (response) => {
//         //       this.clientWithProfit = response.body;
//         //     },
//         //   });
//     }

//     ngOnDestroy(): void {
//         this.unsubscribe$.next();
//         this.unsubscribe$.complete();
//         this.unitOfWorkService.unsubscribe();
//     }
// }
