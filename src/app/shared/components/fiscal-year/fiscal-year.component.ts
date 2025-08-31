import { Component, inject, OnInit } from '@angular/core';
import { DestroyableComponentBase } from '../../classes/destroyable-component-base.abstract';
import { takeUntil } from 'rxjs';
import { FiscalYearRepository } from '../../../core/repositories/fiscal-year.repository';
import { UnitOfWorkService } from '../../../core/services/unit-of-work.service';
import { LocalStorageKeys } from '../../constants/local-storage-keys.constants';

@Component({
    selector: 'app-fiscal-year',
    templateUrl: './fiscal-year.component.html',
    styleUrls: ['./fiscal-year.component.css']
})
export class FiscalYearComponent extends DestroyableComponentBase implements OnInit {
    unitOfWorkService = inject(UnitOfWorkService);

    fiscalYearService = inject(FiscalYearRepository);
    fiscalYears: IFiscalYear[] = [];
    selectedYear?: IFiscalYear;

    ngOnInit() {
        this.setLabel();
        this.unitOfWorkService.fiscalYear
            .getAll()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe({
                next: (res) => {
                    this.fiscalYears = res.body;
                    const fiscalYearId = localStorage.getItem(LocalStorageKeys.FISCAL_YEAR_ID);
                    this.selectedYear = this.fiscalYears.find((y) => y.guid === fiscalYearId);
                    const currentYear = this.fiscalYears.find((y) => y.isCurrent);
                    if (!fiscalYearId && !!currentYear) this.handleFiscalYearChange(currentYear);
                }
            });
    }

    setLabel() {
        const fiscalYearId = localStorage.getItem(LocalStorageKeys.FISCAL_YEAR_ID);
        this.selectedYear = this.fiscalYears.find((y) => y.guid === fiscalYearId);
    }

    handleFiscalYearChange(fiscalYear: IFiscalYear) {
        localStorage.setItem(LocalStorageKeys.FISCAL_YEAR_ID, fiscalYear.guid.toString());
        localStorage.setItem(LocalStorageKeys.FISCAL_YEAR_IS_CURRENT, fiscalYear.isCurrent.toString());
        if (!fiscalYear.isCurrent) localStorage.removeItem(LocalStorageKeys.SHIFT_ID);
        window.location.reload();
    }

    onDestroy(): void {
        this.fiscalYearService.unsubscribe$.next();
        this.fiscalYearService.unsubscribe$.complete();
    }
}
