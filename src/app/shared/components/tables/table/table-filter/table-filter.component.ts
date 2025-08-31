import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OnDestroy, OnInit } from '@angular/core';
import { ITableColumn } from '../../../../interfaces/table-column.interface';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Subject, debounceTime } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';

@Component({
    selector: 'table-filter',
    templateUrl: './table-filter.component.html',
    styleUrls: ['./table-filter.component.css']
})
export class TableFilterComponent implements OnInit, OnDestroy {
    @Input({ required: true }) column!: ITableColumn;
    @Output() filterChange = new EventEmitter<any>();
    @Output() clearFilters = new EventEmitter<void>();

    private inputChange$ = new Subject<any>();

    ngOnInit(): void {
        this.inputChange$.pipe(debounceTime(500)).subscribe((event) => this.filterChange.emit(event));
    }

    onFilterChange(event: any) {
        if (event instanceof MatSelectChange) {
            this.filterChange.emit(event);
        } else {
            this.inputChange$.next(event);
        }
    }

    onClearFilters(event: any) {
        this.clearFilters.emit();
    }

    onDateChange(event: MatDatepickerInputEvent<Date>) {
        this.inputChange$.next(event);
    }

    ngOnDestroy(): void {
        this.inputChange$.complete();
    }
}
