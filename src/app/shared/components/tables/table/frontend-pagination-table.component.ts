import { Component, Input } from '@angular/core';
import { TableComponentBase } from './table-component-base.abstract';
import { FrontendDataSource } from './datasource/frontend-datasource';
import { IApiResponseT } from '../../../../core/Common/models/response/api-response-t.interface';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-frontend-pagination-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})
export class FrontendPaginationTableComponent<T> extends TableComponentBase<T> {
    @Input({ required: true }) dataObservableFn!: () => Observable<IApiResponseT<any[]>>;
    dataSource!: FrontendDataSource<T>;

    onInit() {
        this.dataSource = new FrontendDataSource<T>(this.dataObservableFn.bind(this), this.tableCommunicationService);
    }

    afterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.initializeDataStream();
    }

    onDestroy() {}
}
