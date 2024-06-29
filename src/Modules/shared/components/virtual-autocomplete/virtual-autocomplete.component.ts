import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, OnInit, OnDestroy, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, debounceTime, startWith, takeUntil } from 'rxjs';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatComponentsModule } from '../../../mat-components.Module/mat-components.module';
import { VirtualScrollDataSource } from './virtualScrollDataSource';
import { ClientForForm } from '../../../client/interFaces/IClientForForm';

@Component({
  selector: 'app-virtual-autocomplete',
  templateUrl: './virtual-autocomplete.component.html',
  styleUrls: ['./virtual-autocomplete.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ScrollingModule, CommonModule, MatComponentsModule, ReactiveFormsModule, TranslateModule],
})
export class VirtualAutocompleteComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  @Input() label: string = '';
  @Input() displayTextKey: string = 'name';
  @Input() hasNewClient: boolean = false;
  @Input() placeholder: string = '';
  @Input() id: any = 0;
  @Input() selectedValue!: any;
  @Input() database: any;

  @Output() selectedId = new EventEmitter<number>();

  newClient: ClientForForm = {
    id: -1,
    name: 'أضافة عميل جديد',
    clientTypeId: -1,
  };

  nameControl = new FormControl();

  ds!: VirtualScrollDataSource;

  ngOnInit() {
    this.nameControl.addValidators([Validators.required]);
    this.ds = new VirtualScrollDataSource(this.database);
    this.nameControl.valueChanges.pipe(startWith(this.nameControl.value), debounceTime(1000), takeUntil(this.destroy$)).subscribe((value) => {
      this.ds.filterSubject.next(value);
    });
  }
  displayFn = (item: any): string => (item ? item[this.displayTextKey] : '');

  emitSelectedId = (item: any) => this.selectedId.emit(item ? item.id : null);

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
