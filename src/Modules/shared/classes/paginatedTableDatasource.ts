import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { BehaviorSubject, Observable, merge, map } from "rxjs";
import { Status } from "src/Modules/order/Enums/status";
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


	private generateSearchString(item: any): string {
		let searchStr = "";
		for (const key in item) {
			if (key === "orderStatus") searchStr += this.extractOrderStatusString(item[key]);
			else searchStr += item[key];
		}
		return searchStr.toLowerCase();
	}
	private extractOrderStatusString(status: Status): string {
		switch (status) {
			case Status.غير_مكتمل:
				return "غير_مكتمل";
			case Status.اعداد:
				return "اعداد";
			case Status.جاهز:
				return "جاهز";
			case Status.استلم:
				return "استلم";
			case Status.اكتمل:
				return "اكتمل";
			case Status.حجز:
				return "حجز";
			case Status.مرتجع:
				return "مرتجع";
			case Status.هالك:
				return "هالك";
		}
	}
}
