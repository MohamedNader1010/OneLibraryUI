import { Directive, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()
export abstract class DestroyableComponentBase implements OnInit, OnDestroy {
    unsubscribe$ = new Subject<void>();

    abstract baseOnInit(): void;
    abstract baseOnDestroy(): void;

    ngOnInit(): void {
        this.baseOnInit();
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.baseOnDestroy();
        this.unsubscribe$.complete();
        console.log(`component ${this.constructor.name} destroyed`);
    }
}
