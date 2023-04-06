import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogServiceService {
  private _closeSubject = new Subject<void>();
  onClose(): Observable<void> {
    return this._closeSubject.asObservable();
  }

  closeDialog(): void {
    this._closeSubject.next();
  }
}
