import { Component, OnInit } from '@angular/core';
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

  constructor(private _fiscalYearService: FiscalYearsService) {}
  ngOnInit() {
    this._fiscalYearService.getAllFiscalYears().subscribe({
      next: (res) => {
        console.log(res);
        this.fiscalYears = res.body;
      },
    });
  }

  applyFiscalYearFilter(event: any) {
    // will be implemented...
    console.log('Selected fiscal year:', event.value);
  }
}
