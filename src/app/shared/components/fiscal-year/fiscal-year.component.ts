import { Component, inject, OnInit } from '@angular/core';
import { IFiscalYear } from '../../../core/data/models/fiscalYear/fiscalYear.interface';
import { FiscalYearsService } from '../../../core/data/services/fiscal-years.service';

@Component({
  selector: 'app-fiscal-year',
  templateUrl: './fiscal-year.component.html',
})
export class FiscalYearComponent implements OnInit {
  fiscalYears: IFiscalYear[] = [];
  _fiscalYearService = inject(FiscalYearsService);

  ngOnInit() {
    this._fiscalYearService.getAllFiscalYears().subscribe({
      next: (res) => {
        this.fiscalYears = res.body;
      },
    });
  }

  handleFiscalYearChange(fiscalYear: any, event: any) {
    console.log(fiscalYear, event);
  }

  applyFiscalYearFilter(event: any) {
    // will be implemented...
  }
}
