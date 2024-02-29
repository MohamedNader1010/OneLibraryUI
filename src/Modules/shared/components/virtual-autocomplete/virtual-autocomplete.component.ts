import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
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
export class VirtualAutocompleteComponent {
  destroy$ = new Subject<void>();
  @Input() label: string = '';
  @Input() desplayTextKey: string = 'name';
  @Input() loading: boolean = false;
  @Input() disable: boolean = false;
  @Input() backendSideFilter: boolean = false;
  @Input() hasNewClient: boolean = false;
  @Input() placeholder: string = '';
  @Input() id: any;
  @Input() dataSource: any[] = [];
  @Input() selectedValue!: any;
  @Output() selectedId = new EventEmitter<number>();

  nameControl = new FormControl();

  ds = new MyDataSource();
}
