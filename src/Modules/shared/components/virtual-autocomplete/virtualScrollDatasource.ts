import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { BehaviorSubject, Subscription, Observable, merge, Subject, startWith, debounceTime, takeUntil, switchMap } from 'rxjs';
import { PagingCriteria } from '../../interfaces/pagingCriteria';
import { ResponseDto } from '../../interfaces/IResponse.dto';

export class VirtualScrollDataSource extends DataSource<any> {
  private _cacheLength = 200;
  private _pageSize = 20;
  private _cachedData = Array.from<any>({ length: this._cacheLength });
  private _fetchedPages = new Set<number>();
  private readonly _dataStream = new BehaviorSubject(this._cachedData);
  public filterSubject = new BehaviorSubject<string | null>(null);
  private readonly _subscription = new Subscription();

  constructor(public databaseService: any) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<any> {
    console.log('Connect function called');
    const collectionViewerSubscription = collectionViewer.viewChange.subscribe((changes) => {
      const { start, end } = changes;
      const pagesToFetch = this.calculatePagesToFetch(start, end);
      const pagingCriteria: PagingCriteria = {
        pageIndex: 0,
        pageSize: this._pageSize,
        filter: this.filterSubject.value,
      } as PagingCriteria;
      for (const page of pagesToFetch) {
        pagingCriteria.pageIndex = page;
        this._fetchPage(pagingCriteria);
        this._fetchedPages.add(page);
      }
    });

    // const filterSubscription =
    this.filterSubject
      .pipe(
        startWith(this.filterSubject.value),
        debounceTime(1000),
        switchMap((filterValue) => {
          console.log('_filter', filterValue);
          // this._cachedData = Array.from<any>({ length: this._cacheLength });
          // this._fetchedPages = new Set<number>();
          const pagingCriteria: PagingCriteria = {
            pageIndex: 0,
            pageSize: this._pageSize,
            filter: this.filterSubject.getValue(),
          } as PagingCriteria;
          return this.databaseService.getPagedData(pagingCriteria);
        }),
      )
      .subscribe({
        next: (data: any) => {
          // this._cachedData = [...data.body];
          // this._dataStream.next(this._cachedData);
          console.log('data', data);
        },
      });
    this._subscription.add(collectionViewerSubscription);
    // this._subscription.add(filterSubscription);
    return this._dataStream;
  }

  disconnect(): void {
    this._subscription.unsubscribe();
  }

  private calculatePagesToFetch(start: number, end: number): Set<number> {
    const pagesToFetch = new Set<number>();
    for (let page = this._getPageForIndex(start); page <= this._getPageForIndex(end - 1); page++) {
      if (!this._fetchedPages.has(page)) {
        pagesToFetch.add(page);
      }
    }
    return pagesToFetch;
  }

  private _getPageForIndex = (index: number): number => Math.floor(index / this._pageSize);

  private _fetchPage(pagingCriteria: PagingCriteria) {
    this.databaseService.getPagedData(pagingCriteria).subscribe({
      next: (data: ResponseDto) => {
        console.log('data', data);
        this._cachedData.splice(pagingCriteria.pageIndex * this._pageSize, this._pageSize, ...data.body);
        this._dataStream.next(this._cachedData);
      },
    });
  }
}
