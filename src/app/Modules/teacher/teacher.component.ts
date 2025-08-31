import { Component } from '@angular/core';
import { PaginatedListComponentBase } from '../../shared/classes/paginated-list-component-base.abstract';
import { IPaginationRequest } from '../../core/Common/models/request/pagination-request.model';
import { ITableAction } from '../../shared/interfaces/table-action.interface';
import { getCreateAction, getDetailsPageNavigationAction, getEditAction } from '../../shared/utilities/table-actions-utility';
import { TEACHER_COLUMNS } from '../../shared/utilities/table-columns';
import { ITeacherOverviewDTO } from '../../core/models/Teachers/dtos/teacher-overview-dto.interface';
import { ColumnsToken } from '../../shared/utilities/table-columns/table-columns.factory';
import { ITeacherFullDTO } from '../../core/models/Teachers/dtos/teacher-full-dto.interface';
import { CreateTeacherFormDialogComponent } from './components/teacher-form-dialog/create-teacher-form-dialog.component';
import { EditTeacherFormDialogComponent } from './components/teacher-form-dialog/edit-teacher-form-dialog.component';
@Component({
    selector: 'app-all-teachers',
    templateUrl: './teacher.component.html'
})
export class TeacherComponent extends PaginatedListComponentBase<ITeacherOverviewDTO> {
    dataObservableFn = (paginationRequest: IPaginationRequest) => this.unitOfWorkService.teacher.getAllPaginated(paginationRequest);
    columnsToken: ColumnsToken = TEACHER_COLUMNS;

    tableActions: ITableAction[] = [
        getCreateAction(() => this.openDialogWithAutoReload(CreateTeacherFormDialogComponent)),
        getDetailsPageNavigationAction<ITeacherFullDTO>((row) => this.router.navigate([`/teachers/${row.id}`])),
        getEditAction<ITeacherOverviewDTO>((row) => this.openDialogWithAutoReload(EditTeacherFormDialogComponent, row))
    ];

    onInit() {}

    onDestroy() {
        console.log(`component ${this.constructor.name} destroyed`);
    }
}
