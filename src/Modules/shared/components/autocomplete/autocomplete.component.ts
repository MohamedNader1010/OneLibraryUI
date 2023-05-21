import {Component, Input, OnInit, OnDestroy, Output, EventEmitter, OnChanges} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {BehaviorSubject, Observable, Subscription, map, startWith} from 'rxjs';

@Component({
	selector: 'autocomplete',
	templateUrl: './autocomplete.component.html',
	styleUrls: ['./autocomplete.component.css'],
})
export class AutocompleteComponent implements OnInit, OnChanges, OnDestroy {
	subscriptions: Subscription[] = [];
	@Input() label: string = '';
	@Input() clear: BehaviorSubject<number> = new BehaviorSubject(0);
	@Input() placeholder: string = '';
	@Input() formControlName: string = '';
	@Input() dataSource: any[] = [];
	@Input() selectedValue!: any;
	@Output() selectedId = new EventEmitter<number>();
	nameControl = new FormControl();
	filteredData$!: Observable<any[]>;
	ngOnInit() {
		this.nameControl.addValidators([Validators.required]);
		this.filteredData$ = this.nameControl.valueChanges.pipe(
			startWith(null),
			map((value) => {
				if (value) {
					let filtered = this._filter(value);
					if (filtered.length) {
						this.nameControl.setErrors({required: true});
						this.selectedId.emit(undefined);
						return filtered;
					}
					if (typeof value != 'object') {
						this.nameControl.setErrors({notFound: true});
						this.selectedId.emit(undefined);
					}
				}
				return this.dataSource.slice();
			})
		);
		this.subscriptions.push(
			this.clear.subscribe({
				next: () => {
					this.nameControl.reset();
				},
			})
		);
	}
	ngOnChanges() {
		if (this.dataSource.length && this.selectedValue) this.nameControl.setValue(this.dataSource.find((option) => option.id === this.selectedValue));
	}
	private _filter = (value: any): any[] => this.dataSource.filter((item) => item.name.toLowerCase().includes(value.toString().toLowerCase()));

	displayFn = (item: any): string => (item ? item.name : '');

	getItemId = (item: any) => this.selectedId.emit(item ? item.id : null);

	ngOnDestroy = () => this.subscriptions.forEach((s) => s.unsubscribe());
}
