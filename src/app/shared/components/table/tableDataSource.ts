import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, Observable, merge, map } from 'rxjs';
export class TableDataSource extends DataSource<any> {
  #filterSubject = new BehaviorSubject<{ [key: string]: string }>({});

  get filters(): { [key: string]: string } {
    return this.#filterSubject.value;
  }

  set filters(filters: { [key: string]: string }) {
    this.#filterSubject.next(filters);
  }

  filteredData: any[] = [];
  renderedData: any[] = [];

  #filteredDataLengthSubject = new BehaviorSubject<number>(0);

  filteredDataLength$ = this.#filteredDataLengthSubject.asObservable();

  constructor(public database: any, public _paginator: MatPaginator, public _sort: MatSort) {
    super();
    this.#filterSubject.subscribe(() => (this._paginator.pageIndex = 0));
    this.#filteredDataLengthSubject.next(this.database.data.length);
  }

  connect(): Observable<any[]> {
    const displayDataChanges = [this.database.dataChange, this._sort.sortChange, this.#filterSubject, this._paginator.page];
    return merge(...displayDataChanges).pipe(
      map(() => {
        this.filteredData = this.database.data.body?.slice()?.filter((item: any) => {
          return Object.keys(this.filters).every((key) => item[key.charAt(0).toLowerCase() + key.slice(1)]?.toString().toLowerCase().includes(this.filters[key]?.toString().toLowerCase()));
        });
        const sortedData = this.sortData(this.filteredData?.slice());
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        this.renderedData = sortedData?.splice(startIndex, this._paginator.pageSize);
        setTimeout(() => {
          this.#filteredDataLengthSubject.next(this.filteredData?.length ?? 0);
        });
        return this.renderedData;
      }),
    );
  }

  disconnect() {}

  sortData(data: any[]): any[] {
    if (!data) return data;
    if (!this._sort.active || this._sort.direction === '') return data;
    return data.sort((a, b) => {
      let propertyA: any, propertyB: any;
      [propertyA, propertyB] = [a[this._sort.active], b[this._sort.active]];
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
