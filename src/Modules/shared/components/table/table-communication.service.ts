import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TableCommunicationService {
  reloadTable$ = new Subject<void>();

  subscribeToReloadTable = (callback: () => void) => {
    this.reloadTable$.subscribe(() => {
      callback();
    });
  };
}
