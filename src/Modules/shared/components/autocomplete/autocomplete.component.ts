import { Component, Input, OnInit, OnDestroy, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, Subject, debounceTime, map, of, startWith, switchMap, takeUntil, catchError } from 'rxjs';
import { ClientService } from '../../../client/services/client.service';
import { ClientForForm } from '../../../client/interFaces/IClientForForm';

@Component({
  selector: 'autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
})
export class AutocompleteComponent implements OnInit, OnChanges, OnDestroy {
  destroy$ = new Subject<void>();
  @Input() label: string = '';
  @Input() desplayTextKey: string = 'name';
  @Input() loading: boolean = false;
  @Input() disable: boolean = false;
  @Input() backendSideFilter: boolean = false;
  @Input() hasNewClient: boolean = false;
  @Input() placeholder: string = '';
  @Input() id: any = 0;
  @Input() dataSource: any[] = [];
  @Input() selectedValue!: any;
  @Output() selectedId = new EventEmitter<number>();

  nameControl = new FormControl();
  newClient: ClientForForm = {
    id: -1,
    name: 'أضافة عميل جديد',
    clientTypeId: -1,
  };
  filteredData$!: Observable<any[]>;

  constructor(private _clientService: ClientService) {}
  ngOnInit() {
    this.nameControl.addValidators([Validators.required]);
    this.filteredData$ = this.nameControl.valueChanges.pipe(
      startWith(this.nameControl.value),
      debounceTime(1000),
      switchMap((value) => {
        if (value) {
          if (this.backendSideFilter) {
            return this.backend(value);
          } else {
            return this.frontend(value);
          }
        }
        if (this.backendSideFilter) {
          return of([this.newClient]);
        } else {
          return of(this.dataSource.slice());
        }
      }),
      takeUntil(this.destroy$),
    );
  }

  backend = (value: any) => {
    if (this.id == null || this.id == undefined) return [];
    return this._clientService.getAllByType(this.id, value).pipe(
      map((response) => {
        let filtered: any[] = response.body;
        if (filtered.length) {
          this.nameControl.setErrors({ required: true });
          this.selectedId.emit(undefined);
        }
        if (typeof value != 'object') {
          this.nameControl.setErrors({ notFound: true });
          this.selectedId.emit(undefined);
        }
        if (this.hasNewClient) {
          filtered = [this.newClient, ...filtered];
        }
        return filtered;
      }),
    );
  };

  frontend = (value: any) => {
    const filtered: any[] = this.filter(value);
    if (filtered.length) {
      this.nameControl.setErrors({ required: true });
      this.selectedId.emit(undefined);
    }
    if (typeof value != 'object') {
      this.nameControl.setErrors({ notFound: true });
      this.selectedId.emit(undefined);
    }
    return of(filtered);
  };
  ngOnChanges(changes: any) {
    if (changes.dataSource || this.selectedValue === null) this.nameControl.reset();
    if (this.dataSource.length && this.selectedValue) {
      let selectedItem = this.dataSource.find((option) => option.id === this.selectedValue);
      this.nameControl.setValue(selectedItem);
    }
    if (changes.disable) {
      this.disable ? this.nameControl.disable() : this.nameControl.enable();
    }
  }

  filter = (value: any): any[] => {
    let filteredData = this.dataSource.filter((item: any) => {
      const barPrefix = 'bar-';
      const barcodeIndex = `${value}`.indexOf(barPrefix) ?? -1;
      if (barcodeIndex < 0) {
        let searchStr = '';
        for (var key in item) searchStr += item[key];
        searchStr = searchStr.toLowerCase();
        if (typeof value == 'string') return searchStr.indexOf(value.trim().trimEnd().toLowerCase()) !== -1;
        else return searchStr.indexOf(value) !== -1;
      } else {
        const id = +value.substring(barPrefix.length);
        return item.id === id;
      }
    });
    return filteredData;
  };

  displayFn = (item: any): string => (item ? item[this.desplayTextKey] : '');

  emitSelectedId = (item: any) => this.selectedId.emit(item ? item.id : null);

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
