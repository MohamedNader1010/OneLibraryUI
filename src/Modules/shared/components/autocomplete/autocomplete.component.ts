import {Component, Input, OnInit, OnDestroy, Output, EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, Subscription, map, startWith} from 'rxjs';

@Component({
	selector: 'app-autocomplete',
	templateUrl: './autocomplete.component.html',
	styleUrls: ['./autocomplete.component.css'],
})
export class AutocompleteComponent<T> implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	@Input() label: string = '';
	@Input() formcontrolname: string = '';
	@Output() onSelection: EventEmitter<any> = new EventEmitter<any>();
	dataSource: any[] = [];
	filteredOptions!: Observable<any[]>;
	id = new FormControl('');

	ngOnInit(): void {
		this.filteredOptions = this.id.valueChanges.pipe(
			startWith(this.id.value),
			map((value) => {
				let filtered = [];
				let name;
				if (typeof value === 'string') name = value;
				if (name) {
					filtered = this.filterClients(name as string);
					if (filtered.length) return filtered;
					else {
						this.id.setErrors({notFound: true});
						return this.dataSource.slice();
					}
				} else return [];
			})
		);
	}

	filterClients = (name: string): T[] => this.dataSource.filter((option) => option.name.includes(name));

	displayFn = (value: number): string => this.dataSource.find((option) => option.id === value)?.name ?? '';

	ngOnDestroy = () => this.subscriptions.forEach((s) => s.unsubscribe());
}
