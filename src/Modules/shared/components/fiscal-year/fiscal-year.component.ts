import { Component, inject, OnInit } from '@angular/core';
import { FiscalYearsService } from '../../services/fiscal-years.service';
import { FiscalYear } from '../../interfaces/fiscalYear';

@Component({
  selector: 'app-fiscal-year',
  templateUrl: './fiscal-year.component.html',
  styleUrls: ['./fiscal-year.component.css'],
})
export class FiscalYearComponent implements OnInit {
  fiscalYears: FiscalYear[] = [];
  selectedStartYear: string | null = '';
  selectedEndYear: string | null = '';
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
