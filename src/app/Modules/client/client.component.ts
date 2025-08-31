import { Component } from '@angular/core';
import { ClientBulkPaymentFormComponent } from './components/client-bulk-payment-form/client-bulk-payment-form.component';
import { IClientOverviewDTO } from '../../core/models/Clients/dtos/client-overview-dto.interface';
import { PaginatedListComponentBase } from '../../shared/classes/paginated-list-component-base.abstract';
import { CreateClientFormDialogComponent } from './components/client-form-dialog/create-client-form-dialog.component';
import { EditClientFormDialogComponent } from './components/client-form-dialog/edit-client-form-dialog.component';
import { IPaginationRequest } from '../../core/Common/models/request/pagination-request.model';
import { ITableAction } from '../../shared/interfaces/table-action.interface';
import {
    getBulkPaymentAction,
    getCreateAction,
    getDetailsPageNavigationAction,
    getEditAction
} from '../../shared/utilities/table-actions-utility';
import { CLIENT_COLUMNS } from '../../shared/utilities/table-columns';
import { ColumnsToken } from '../../shared/utilities/table-columns/table-columns.factory';
import { IClientFullDTO } from '../../core/models/Clients/dtos/client-full-dto.interface';
@Component({
    selector: 'app-all-clients',
    templateUrl: './client.component.html'
})
export class ClientComponent extends PaginatedListComponentBase<IClientOverviewDTO> {
    dataObservableFn = (paginationRequest: IPaginationRequest) => this.unitOfWorkService.client.getAllPaginated(paginationRequest);
    columnsToken: ColumnsToken = CLIENT_COLUMNS;

    tableActions: ITableAction[] = [
        getCreateAction(() => this.openDialogWithAutoReload(CreateClientFormDialogComponent)),
        getDetailsPageNavigationAction<IClientFullDTO>((row) => this.router.navigate([`/clients/${row.id}`])),
        getEditAction<IClientOverviewDTO>((row) => this.openDialogWithAutoReload(EditClientFormDialogComponent, row)),
        getBulkPaymentAction((row: IClientOverviewDTO) => this.openDialogWithAutoReload(ClientBulkPaymentFormComponent, row))
    ];

    onInit() {}

    onDestroy() {
        console.log(`component ${this.constructor.name} destroyed`);
    }
}
