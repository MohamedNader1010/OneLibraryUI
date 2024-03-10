import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, Observable, merge, map } from 'rxjs';
import { OrderDetailStatus } from 'src/Modules/shared/enums/OrderDetailStatus.enum';
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

  constructor(public database: any, public _paginator: MatPaginator, public _sort: MatSort) {
    super();
    this._filterChange.subscribe(() => (this._paginator.pageIndex = 0));
    this._filteredDataLengthSubject.next(this.database.data.length);
  }
  connect(): Observable<any[]> {
    const displayDataChanges = [this.database.dataChange, this._sort.sortChange, this._filterChange, this._paginator.page];

    return merge(...displayDataChanges).pipe(
      map(() => {
        this.filteredData = this.database.data.body?.slice()?.filter((item: any) => {
          const barPrefix = 'bar-';
          const barcodeIndex = `${this.filter}`.indexOf(barPrefix) ?? -1;
          if (barcodeIndex < 0) {
            const searchStr = this.generateSearchString(item);
            return searchStr.includes(this.filter.toLowerCase());
          } else {
            const id = +this.filter.substring(barPrefix.length);
            return item.id === id;
          }

        });
        const sortedData = this.sortData(this.filteredData?.slice());
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        this.renderedData = sortedData?.splice(startIndex, this._paginator.pageSize);
        setTimeout(() => {
          this._filteredDataLengthSubject.next(this.filteredData?.length ?? 0);
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

  private generateSearchString(item: any): string {
    let searchStr = '';
    for (const key in item) {
      if (key === 'orderStatus') searchStr += this.extractOrderStatusString(item[key]);
      else searchStr += item[key];
    }
    return searchStr.toLowerCase();
  }
  private extractOrderStatusString(status: OrderDetailStatus): string {
    switch (status) {
      case OrderDetailStatus.غير_مكتمل:
        return 'غير_مكتمل';
      case OrderDetailStatus.جاهز:
        return 'جاهز';
      case OrderDetailStatus.استلم:
        return 'استلم';
      case OrderDetailStatus.اكتمل:
        return 'اكتمل';
      case OrderDetailStatus.حجز:
        return 'حجز';
      case OrderDetailStatus.مرتجع:
        return 'مرتجع';
      case OrderDetailStatus.هالك:
        return 'هالك';
    }
  }
}
