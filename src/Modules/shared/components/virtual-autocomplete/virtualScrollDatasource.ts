import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { PagingCriteria } from '../../interfaces/pagingCriteria';
import { ResponseDto } from '../../interfaces/IResponse.dto';

export class MyDataSource extends DataSource<any> {
  private _cacheLength = 200;
  private _pageSize = 20;
  private _cachedData = Array.from<any>({ length: this._cacheLength });
  private _fetchedPages = new Set<number>();
  private readonly _dataStream = new BehaviorSubject(this._cachedData);
  private readonly _subscription = new Subscription();

  constructor(public databaseService: any) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<any> {
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

    const pagingCriteria: PagingCriteria = {
      pageIndex: page,
      pageSize: this._pageSize,
    } as PagingCriteria;

    debugger;
    if (!this.databaseService) return;

    this.databaseService.getPagedData(pagingCriteria).subscribe({
      next: (data: ResponseDto) => {
        this._cachedData.splice(page * this._pageSize, this._pageSize, ...data.body);
        this._dataStream.next(this._cachedData);
      },
      error: (error: any) => {
        console.error(`Error fetching data for page ${page}:`, error);
      },
    });
  }
}
