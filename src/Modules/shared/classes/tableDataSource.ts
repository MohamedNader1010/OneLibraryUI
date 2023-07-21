import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, Observable, merge, map } from 'rxjs';
import { Status } from 'src/Modules/order/Enums/status';
export class TableDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string {
    return this._filterChange.value;
  }
  set filter(filter: string) {
    this._filterChange.next(filter);
  }
  filteredData: any[] = [];
  renderedData: any[] = [];
  private _filteredDataLengthSubject = new BehaviorSubject<number>(0);
  filteredDataLength$ = this._filteredDataLengthSubject.asObservable();

  constructor(
    public database: any,
    public _paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    console.log(this._paginator.pageIndex);
    this._filterChange.subscribe(() => this._paginator.pageIndex);
    this._filteredDataLengthSubject.next(this.database.data.totalCount);
  }
  connect(): Observable<any[]> {
    const displayDataChanges = [
      this.database.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page,
    ];

    return merge(...displayDataChanges).pipe(
      map(() => {
        this.filteredData = this.database.data.body
          .slice()
          .filter((item: any) => {
            const searchStr = this.generateSearchString(item);
            return searchStr.toLowerCase().includes(this.filter.toLowerCase());
          });

        this._filteredDataLengthSubject.next(this.database.data.totalCount);
        console.log(this.filteredData)
        const sortedData = this.sortData(this.filteredData.slice());

        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;

        this.renderedData = this.filteredData;

        return this.renderedData;
      })
    );
  }
  disconnect() {}
  sortData(data: any[]): any[] {
    if (!this._sort.active || this._sort.direction === '') return data;
    return data.sort((a, b) => {
      let propertyA: any, propertyB: any;
      [propertyA, propertyB] = [a[this._sort.active], b[this._sort.active]];
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
      );
    });
  }

  private generateSearchString(item: any): string {
    let searchStr = '';
    for (const key in item) {
      if (key === 'orderStatus')
        searchStr += this.extractOrderStatusString(item[key]);
      else searchStr += item[key];
    }
    return searchStr.toLowerCase();
  }
  private extractOrderStatusString(status: Status): string {
    switch (status) {
      case Status.غير_مكتمل:
        return 'غير_مكتمل';
      case Status.اعداد:
        return 'اعداد';
      case Status.جاهز:
        return 'جاهز';
      case Status.استلم:
        return 'استلم';
      case Status.اكتمل:
        return 'اكتمل';
      case Status.حجز:
        return 'حجز';
      case Status.مرتجع:
        return 'مرتجع';
      case Status.هالك:
        return 'هالك';
    }
  }
}
