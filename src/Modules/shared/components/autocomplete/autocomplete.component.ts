import {Component, Input, OnInit, OnDestroy, Output, EventEmitter} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Observable, Subscription, map, startWith} from 'rxjs';

@Component({
	selector: 'autocomplete',
	templateUrl: './autocomplete.component.html',
	styleUrls: ['./autocomplete.component.css'],
})
export class AutocompleteComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	@Input() label: string = '';
	@Input() placeholder: string = '';
	@Input() formControlName: string = '';
	@Input() dataSource: any[] = [];

	@Output() selectedId = new EventEmitter<number>();

	filteredOptions!: Observable<any[]>;

	nameControl = new FormControl();
	filteredData$!: Observable<any[]>;
	ngOnInit() {
		this.nameControl.addValidators([Validators.required]);
		this.filteredData$ = this.nameControl.valueChanges.pipe(
			startWith(this.nameControl.value),
			map((value) => {
				let filtered = this._filter(value);
				if (filtered.length) {
					return filtered;
				}
				if (typeof value != 'object') this.nameControl.setErrors({notFound: true});
				return this.dataSource.slice();
			})
		);
	}
	private _filter = (value: any): any[] => this.dataSource.filter((item) => item.name.toLowerCase().includes(value.toString().toLowerCase()));

	displayFn = (item: any): string => (item ? item.name : '');

	getItemId = (item: any) => this.selectedId.emit(item ? item.id : null);

	ngOnDestroy = () => this.subscriptions.forEach((s) => s.unsubscribe());
}
