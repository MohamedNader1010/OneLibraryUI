import {DataSource} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {BehaviorSubject, Observable, merge, map} from 'rxjs';
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
	constructor(public database: any, public _paginator: MatPaginator, public _sort: MatSort) {
		super();
		this._filterChange.subscribe(() => (this._paginator.pageIndex = 0));
	}
	connect(): Observable<any[]> {
		const displayDataChanges = [this.database.dataChange, this._sort.sortChange, this._filterChange, this._paginator.page];
		return merge(...displayDataChanges).pipe(
			map(() => {
				this.filteredData = this.database.data.slice().filter((item: any) => {
					let searchStr = '';
					for (var key in item) searchStr += item[key];
					searchStr = searchStr.toLowerCase();
					return searchStr.indexOf(this.filter.trim().trimEnd().toLowerCase()) !== -1;
				});
				const sortedData = this.sortData(this.filteredData.slice());
				const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
				this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
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
			return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
		});
	}
}
