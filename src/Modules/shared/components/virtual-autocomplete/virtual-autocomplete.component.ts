import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { MyDataSource } from './virtualScrollDatasource';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatComponentsModule } from '../../../mat-components.Module/mat-components.module';

@Component({
  selector: 'app-virtual-autocomplete',
  templateUrl: './virtual-autocomplete.component.html',
  styleUrls: ['./virtual-autocomplete.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ScrollingModule, CommonModule, MatComponentsModule, ReactiveFormsModule, TranslateModule],
})
export class VirtualAutocompleteComponent implements OnInit {
  ds!: MyDataSource;
  destroy$ = new Subject<void>();
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() id: any;
  @Input() selectedValue!: any;
  @Input() database: any;
  @Input() desplayTextKey: string = 'name';

  @Output() selectedId = new EventEmitter<number>();

  nameControl = new FormControl();

  ngOnInit() {
    this.ds = new MyDataSource(this.database);
  }
  displayFn = (item: any): string => (item ? item[this.desplayTextKey] : '');

  emitSelectedId = (item: any) => this.selectedId.emit(item ? item.id : null);
}
