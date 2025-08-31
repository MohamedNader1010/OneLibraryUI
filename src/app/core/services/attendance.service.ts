import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AttendanceService {
    #checkedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    checkedIn$ = this.#checkedIn.asObservable();

    setAttendanceState(isCheckedIn: boolean) {
        this.#checkedIn.next(isCheckedIn);
    }

    checkIn() {
        this.#checkedIn.next(true);
    }

    checkOut() {
        this.#checkedIn.next(false);
    }
}
