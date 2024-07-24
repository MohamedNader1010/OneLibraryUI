import { NotfoundComponent } from './components/notfound/notfound.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SharedComponent } from './shared.component';
import { TableComponent } from './components/table/table.component';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { ProfileComponent } from './components/profile/profile.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgChartsModule, NgChartsConfiguration } from 'ng2-charts';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TranslateModule } from '@ngx-translate/core';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { ServiceFactory } from './classes/ServiceFactory';
import { DragAndDropDirective } from './directives/dragAndDrop.directive';
import { DragAndDropComponent } from './components/drag-and-drop/drag-and-drop.component';
import { CdkDetailRowDirective } from './directives/cdk-detail-row.directive';
import { NgxBarcode6Module } from 'ngx-barcode16';
import { VirtualAutocompleteComponent } from './components/virtual-autocomplete/virtual-autocomplete.component';
import { FiscalYearComponent } from './components/fiscal-year/fiscal-year.component';
import { MatComponentsModule } from './modules/mat-components.module';
import { AuthGuard } from '../core/authentication/guards/auth.guard';
import { BankGuard } from '../core/authentication/guards/bank.guard';
import { LoginGuard } from '../core/authentication/guards/login.guard';
import { AuthService } from '../core/authentication/services/auth.service';

@NgModule({
  declarations: [
    DragAndDropDirective,
    SharedComponent,
    ProfileComponent,
    NavbarComponent,
    NotfoundComponent,
    TableComponent,
    DashboardComponent,
    AutocompleteComponent,
    DragAndDropComponent,
    CdkDetailRowDirective,
    FiscalYearComponent,
  ],
  imports: [
    NgChartsModule,
    LoadingBarRouterModule,
    CommonModule,
    SharedRoutingModule,
    MatComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    NgxBarcode6Module,
    VirtualAutocompleteComponent,
  ],
  exports: [TableComponent, AutocompleteComponent, DragAndDropDirective, DragAndDropComponent, NgxBarcode6Module, VirtualAutocompleteComponent],
  providers: [LoginGuard, AuthService, ToastrService, { provide: NgChartsConfiguration, useValue: { generateColors: false } }, ServiceFactory, AuthGuard, BankGuard, CdkDetailRowDirective],
})
export class SharedModule {}
