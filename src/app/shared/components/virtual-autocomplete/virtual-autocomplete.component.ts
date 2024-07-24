import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, debounceTime, startWith } from 'rxjs';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { VirtualScrollDataSource } from './virtualScrollDatasource';
import { ClientForForm } from '../../../core/data/models/client/IClientForForm';
import { MatComponentsModule } from '../../modules/mat-components.module';

@Component({
  selector: 'app-virtual-autocomplete',
  templateUrl: './virtual-autocomplete.component.html',
  styleUrls: ['./virtual-autocomplete.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ScrollingModule, CommonModule, MatComponentsModule, ReactiveFormsModule, TranslateModule],
})
export class VirtualAutocompleteComponent implements OnInit {
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
    this.nameControl.valueChanges.pipe(startWith(this.nameControl.value), debounceTime(1000)).subscribe((value) => {
      this.ds.filterSubject.next(value);
    });
  }
  displayFn = (item: any): string => (item ? item[this.displayTextKey] : '');

  emitSelectedId = (item: any) => this.selectedId.emit(item ? item.id : null);
}
