import { DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, merge, map } from "rxjs";
export class PaginatedTableDatasource extends DataSource<any> {
  _filterChange = new BehaviorSubject("");
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

  ) {
    super();
  }
  connect(): Observable<any[]> {
    const displayDataChanges = [
      this.database.dataChange,
      this._filterChange,
    ];

    return merge(...displayDataChanges).pipe(
      map(() => {
        this._filteredDataLengthSubject.next(this.database.data.totalCount)

        return this.database.data.body;
      })
    );
  }

  disconnect() {}
}
