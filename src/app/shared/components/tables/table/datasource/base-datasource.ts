import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { signal } from '@angular/core';
import { IBaseFilterParams } from '../../../../../core/Common/models/request/base-filter-params.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export abstract class BaseDataSource<T> implements DataSource<T> {
    paginator!: MatPaginator;
    sort!: MatSort;

    #filtersSubject = new BehaviorSubject<IBaseFilterParams[]>([]);
    #dataSubject = new BehaviorSubject<T[]>([]);

    loadingSignal = signal<boolean>(false);
    filters$ = this.#filtersSubject.asObservable();
    data$ = this.#dataSubject.asObservable();

    get filters(): IBaseFilterParams[] {
        return this.#filtersSubject.getValue();
    }

    get isLoading(): boolean {
        return this.loadingSignal();
    }

    get data(): T[] {
        return this.#dataSubject.getValue();
    }

    connect(): Observable<T[]> {
        return this.data$;
    }

    disconnect() {
        this.#dataSubject.complete();
        this.#filtersSubject.complete();
    }

    setFilters(filters: IBaseFilterParams[]) {
        this.#filtersSubject.next(filters);
    }

    clearFilters() {
        this.#filtersSubject.next([]);
    }

    setData(data: T[]) {
        this.#dataSubject.next(data);
    }

    clearData() {
        this.#dataSubject.next([]);
    }
}
