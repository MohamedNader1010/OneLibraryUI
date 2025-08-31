import { PageEvent } from '@angular/material/paginator';
import { Observable, debounceTime, startWith, combineLatest, tap, map, of, catchError, shareReplay, finalize } from 'rxjs';
import { TableCommunicationService } from '../../../../services/table-communication.service';
import { IBaseFilterParams } from '../../../../../core/Common/models/request/base-filter-params.model';
import { IApiResponseT } from '../../../../../core/Common/models/response/api-response-t.interface';
import { BaseDataSource } from './base-datasource';

export class FrontendDataSource<T> extends BaseDataSource<T> {
    constructor(
        private dataObservableFn: () => Observable<IApiResponseT<T[]>>,
        public tableCommunicationService: TableCommunicationService
    ) {
        super();
    }

    initializeDataStream() {
        this.filters$.subscribe(() => {
            this.paginator.pageIndex = 0;
        });
        combineLatest([
            this.dataObservableFn(),
            this.sort.sortChange.pipe(startWith({})),
            this.paginator.page.pipe(startWith({ pageIndex: 0, pageSize: this.paginator.pageSize })),
            this.filters$,
            this.tableCommunicationService.reloadTable$.pipe(startWith(undefined), shareReplay(1))
        ])
            .pipe(
                tap(() => this.loadingSignal.set(true)),
                debounceTime(200),
                map(([data, _, page, filters, __]) => {
                    const filtered = this.#filterData(data.data, filters);
                    const sorted = this.#sortData(filtered);
                    return this.#paginate(sorted, page);
                }),
                catchError((err) => {
                    console.error('Error fetching data:', err);
                    return of([]);
                }),
                finalize(() => this.loadingSignal.set(false))
            )
            .subscribe({
                next: (data) => {
                    this.paginator.length = data.length;
                    this.setData(data);
                }
            });
    }

    #filterData(data: any[], filters: IBaseFilterParams[]): any[] {
        return data.filter((item: any) => {
            return filters.every((filter) => {
                const value = item[filter.key.toLowerCase()];
                return isNaN(+filter.value)
                    ? value?.toString().toLowerCase().includes(filter.value?.toString().toLowerCase())
                    : value === filter.value;
            });
        });
    }

    #sortData(data: any[]): any[] {
        if (!data || data.length === 0) return [];

        let sortColumn = this.sort.active || 'Id';
        let sortDirection: 'asc' | 'desc' | '' = this.sort.direction;

        const columnKey = sortColumn.toLowerCase();

        return sortDirection === ''
            ? data
            : [...data].sort((a, b) => {
                  const valueA = this.#normalizeValue(a[columnKey]);
                  const valueB = this.#normalizeValue(b[columnKey]);

                  if (valueA === valueB) return 0;
                  return (valueA < valueB ? -1 : 1) * (sortDirection === 'asc' ? 1 : -1);
              });
    }

    #normalizeValue(val: any): number | string {
        if (val === null || val === undefined) return Number.NEGATIVE_INFINITY;
        return isNaN(val) ? val.toString().toLowerCase() : +val;
    }

    #paginate(data: any[], page: PageEvent | { pageIndex: number; pageSize: number }): any[] {
        const startIndex = page.pageIndex * page.pageSize;
        const endIndex = startIndex + page.pageSize;
        this.paginator.length = data.length;
        return data.slice(startIndex, endIndex);
    }
}
