import { DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, merge, map } from "rxjs";
export class PaginatedTableDataSource extends DataSource<any> {
  #filteredDataLengthSubject = new BehaviorSubject<number>(0);
  #filterChange = new BehaviorSubject('');

  get filter(): string {
    return this.#filterChange.value;
  }

  set filter(filter: string) {
    this.#filterChange.next(filter);
  }

  filteredData: any[] = [];
  renderedData: any[] = [];

  filteredDataLength$ = this.#filteredDataLengthSubject.asObservable();

  constructor(public database: any) {
    super();
  }

  connect(): Observable<any[]> {
    const displayDataChanges = [this.database.dataChange, this.#filterChange];
    return merge(...displayDataChanges).pipe(
      map(() => {
        this.#filteredDataLengthSubject.next(this.database.data.totalCount);
        return this.database.data.body;
      }),
    );
  }

  disconnect() {}
}
