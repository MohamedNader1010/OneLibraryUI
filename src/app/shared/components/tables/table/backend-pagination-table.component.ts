import { Component, Input } from '@angular/core';
import { TableComponentBase } from './table-component-base.abstract';
import { BackendDataSource } from './datasource/backend-datasource';
import { catchError, combineLatest, debounceTime, Observable, of, shareReplay, startWith, switchMap, tap } from 'rxjs';
import { IPagedResponse } from '../../../../core/Common/models/response/paged-response.interface';
import { IPaginationRequest } from '../../../../core/Common/models/request/pagination-request.model';

@Component({
    selector: 'app-backend-pagination-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})
export class BackendPaginationTableComponent<T> extends TableComponentBase<T> {
    @Input({ required: true }) dataObservableFn!: (paginationRequest: IPaginationRequest) => Observable<IPagedResponse<T>>;
    dataSource!: BackendDataSource<T>;

    onInit() {
        this.dataSource = new BackendDataSource<T>();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.initializeDataStream();
    }

    afterViewInit() {}

    initializeDataStream() {
        this.dataSource.filters$.subscribe(() => {
            this.paginator.pageIndex = 0;
        });
        combineLatest([
            this.sort.sortChange.pipe(startWith({})),
            this.paginator.page.pipe(startWith({ pageIndex: 0, pageSize: this.paginator.pageSize ?? 25 })),
            this.dataSource.filters$,
            this.tableCommunicationService.reloadTable$.pipe(startWith(undefined), shareReplay(1))
        ])
            .pipe(
                tap(() => this.dataSource.loadingSignal.set(true)),
                debounceTime(200),
                switchMap(([_, page, filters, __]) => {
                    this.dataSource.loadingSignal.set(true);
                    this.dataSource.paginationSignal.set({
                        pageIndex: page.pageIndex,
                        pageSize: page.pageSize,
                        orderBy: this.sort?.active ?? '',
                        direction: this.sort?.direction ?? '',
                        filters: filters
                    });
                    return this.dataObservableFn(this.dataSource.paginationSignal());
                }),
                catchError(() => {
                    const empty: T[] = [];
                    this.dataSource.loadingSignal.set(false);
                    return of({ data: empty, metadata: { totalRecords: 0 } } as IPagedResponse<T>);
                })
            )
            .subscribe((data: IPagedResponse<T>) => {
                this.paginator.length = data.metadata.totalRecords;
                this.dataSource.setData(data.data);
                this.dataSource.loadingSignal.set(false);
            });
    }

    onDestroy() {}
}
