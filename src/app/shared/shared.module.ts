import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DragAndDropComponent } from './components/drag-and-drop/drag-and-drop.component';
import { NavbarDropdownComponent } from './components/navbar/components/navbar-dropdown/navbar-dropdown.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BackendPaginationTableComponent } from './components/tables/table/backend-pagination-table.component';
import { NoteClientsSubTableComponent } from './components/tables/sub-tables/note-clients-sub-table/note-clients-sub-table.component';
import { TeacherProfitSubTableComponent } from './components/tables/sub-tables/teacher-profit-sub-table/teacher-profit-sub-table.component';
import { FrontendPaginationTableComponent } from './components/tables/table/frontend-pagination-table.component';
import { DragAndDropDirective } from './directives/dragAndDrop.directive';
import { MatComponentsModule } from './mat-components.module';
import { FormatCellValuePipe } from './pipes/format-cell-value.pipe';
import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { NgChartsModule, NgChartsConfiguration } from 'ng2-charts';
import { NgxBarcode6Module } from 'ngx-barcode16';
import { TableActionsComponent } from './components/tables/table/table-actions/table-actions.component';
import { TableFilterComponent } from './components/tables/table/table-filter/table-filter.component';
import { TableBarcodeComponent } from './components/tables/table/table-barcode/table-barcode.component';
import { TableHeaderCellComponent } from './components/tables/table/table-header-cell/table-header-cell.component';
import { TableRowCellComponent } from './components/tables/table/table-row-cell/table-row-cell.component';
import { BarcodePipe } from './pipes/is-barcode.pipe';
import { ActionsColumnPipe } from './pipes/actions-column.pipe';

@NgModule({
    declarations: [
        SharedComponent,
        ProfileComponent,
        NavbarComponent,
        NavbarDropdownComponent,
        NotfoundComponent,
        FrontendPaginationTableComponent,
        BackendPaginationTableComponent,
        TableActionsComponent,
        TableFilterComponent,
        TableBarcodeComponent,
        TableHeaderCellComponent,
        TableRowCellComponent,
        NoteClientsSubTableComponent,
        TeacherProfitSubTableComponent,
        DashboardComponent,
        AutocompleteComponent,
        DragAndDropComponent,
        // FiscalYearComponent,
        DragAndDropDirective,
        FormatCellValuePipe,
        BarcodePipe,
        ActionsColumnPipe
    ],
    imports: [
        NgChartsModule,
        MatTooltipModule,
        LoadingBarRouterModule,
        CommonModule,
        SharedRoutingModule,
        MatComponentsModule,
        ReactiveFormsModule,
        FormsModule,
        TranslateModule,
        NgxBarcode6Module
    ],
    exports: [
        FrontendPaginationTableComponent,
        BackendPaginationTableComponent,
        AutocompleteComponent,
        DragAndDropDirective,
        DragAndDropComponent,
        NgxBarcode6Module,
        FormatCellValuePipe,
        BarcodePipe,
        ActionsColumnPipe,
        NoteClientsSubTableComponent,
        TeacherProfitSubTableComponent
    ],
    providers: [ToastrService, DatePipe, { provide: NgChartsConfiguration, useValue: { generateColors: false } }]
})
export class SharedModule {}
