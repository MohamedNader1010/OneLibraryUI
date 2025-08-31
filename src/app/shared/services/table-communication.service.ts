import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TableCommunicationService {
    #reloadTable = new Subject<void>();
    reloadTable$ = this.#reloadTable.asObservable();

    reload() {
        this.#reloadTable.next();
    }

    destroy() {
        this.#reloadTable.complete();
    }
}
