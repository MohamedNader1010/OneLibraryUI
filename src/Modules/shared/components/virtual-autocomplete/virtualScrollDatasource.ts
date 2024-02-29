import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';

export class MyDataSource extends DataSource<string | undefined> {
  private http = inject(HttpClient);

  private _length = 100000;
  private _pageSize = 100;
  private _cachedData = Array.from<string>({ length: this._length });
  private _fetchedPages = new Set<number>();
  private readonly _dataStream = new BehaviorSubject<(string | undefined)[]>(this._cachedData);
  private readonly _subscription = new Subscription();

  connect(collectionViewer: CollectionViewer): Observable<(string | undefined)[]> {
    this._subscription.add(
      collectionViewer.viewChange.subscribe((range) => {
        const startPage = this._getPageForIndex(range.start);
        const endPage = this._getPageForIndex(range.end - 1);
        for (let i = startPage; i <= endPage; i++) {
          this._fetchPage(i);
        }
      }),
    );
    return this._dataStream;
  }

  disconnect(): void {
    this._subscription.unsubscribe();
  }

  private _getPageForIndex(index: number): number {
    return Math.floor(index / this._pageSize);
  }

  private _fetchPage(page: number) {
    if (this._fetchedPages.has(page)) {
      return;
    }
    this._fetchedPages.add(page);

    const start = page * this._pageSize;
    const limit = this._pageSize;
    this.http
      .get<any[]>(`https://jsonplaceholder.typicode.com/photos`, {
        params: { _start: start.toString(), _limit: limit.toString() },
      })
      .subscribe({
        next: (data) => {
          this._cachedData.splice(start, limit, ...data.map((item) => item.url));
          this._dataStream.next(this._cachedData);
        },
        error: (error) => {
          console.error(`Error fetching data for page ${page}:`, error);
        },
      });
  }
}
