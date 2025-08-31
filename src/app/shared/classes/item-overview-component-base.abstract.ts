import { Injectable, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DestroyableComponentBase } from './destroyable-component-base.abstract';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogCommunicationService } from '../services/mat-dialog-communication.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { UnitOfWorkService } from '../../core/services/unit-of-work.service';
import { map, Observable } from 'rxjs';
import { IApiResponseT } from '../../core/Common/models/response/api-response-t.interface';

@Injectable()
export abstract class ItemOverviewComponentBase<T> extends DestroyableComponentBase {
    router = inject(Router);
    activatedRoute = inject(ActivatedRoute);
    matDialog = inject(MatDialog);
    matDialogCommunicationService = inject(MatDialogCommunicationService);
    translateService = inject(TranslateService);
    toastrService = inject(ToastrService);
    unitOfWorkService = inject(UnitOfWorkService);

    abstract dataObservable: Observable<IApiResponseT<T>>;

    get data$(): Observable<T> {
        return this.dataObservable.pipe(map((r) => r.data));
    }
}
