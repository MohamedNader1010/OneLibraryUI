import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, Subject, debounceTime, map, of, startWith, switchMap } from 'rxjs';
import { UnitOfWorkService } from '../../../core/services/unit-of-work.service';
import { IClientOverviewDTO } from '../../../core/models/Clients/dtos/client-overview-dto.interface';
import { IGetAllClientsOverviewByClientTypeQuery } from '../../../core/models/Clients/queries/get-all-clients-overview-by-client-type-query.interface';

@Component({
    selector: 'autocomplete',
    templateUrl: './autocomplete.component.html'
})
export class AutocompleteComponent implements OnInit, OnChanges {
    unitOfWorkService = new UnitOfWorkService();

    destroy$ = new Subject<void>();
    @Input() label: string = '';
    @Input() displayTextKey: string = 'name';
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
    newClient: IClientOverviewDTO = {
        id: '',
        name: 'أضافة عميل جديد'
    } as IClientOverviewDTO;
    filteredData$!: Observable<any[]>;

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
            })
        );
    }

    backend = (value: any) => {
        if (this.id == null || this.id == undefined) return [];
        const query: IGetAllClientsOverviewByClientTypeQuery = {
            id: this.id,
            queryFilter: value
        };
        return this.unitOfWorkService.client.getAllByType(query).pipe(
            map((response) => {
                let filtered: IClientOverviewDTO[] = response.data;
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
            })
        );
    };

    frontend = (value: any) => {
        const filtered: IClientOverviewDTO[] = this.filter(value);
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

    filter = (value: any): IClientOverviewDTO[] => {
        let filteredData = this.dataSource.filter((item: IClientOverviewDTO) => {
            const barPrefix = 'bar-';
            const barcodeIndex = `${value}`.indexOf(barPrefix) ?? -1;
            if (barcodeIndex < 0) {
                let searchStr = '';
                for (var key in item) searchStr += item[key as keyof IClientOverviewDTO];
                searchStr = searchStr.toLowerCase();
                if (typeof value == 'string') return searchStr.indexOf(value.trim().trimEnd().toLowerCase()) !== -1;
                else return searchStr.indexOf(value) !== -1;
            } else {
                const id = value.substring(barPrefix.length);
                return item.id === id;
            }
        });
        return filteredData;
    };

    displayFn = (item: any): string => (item ? item[this.displayTextKey] : '');

    emitSelectedId = (item: any) => this.selectedId.emit(item ? item.id : null);
}
