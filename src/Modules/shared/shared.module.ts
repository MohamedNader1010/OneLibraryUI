import {NotfoundComponent} from './components/notfound/notfound.component';
import {FooterComponent} from './components/footer/footer.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedRoutingModule} from './routing/shared-routing.module';
import {NavbarComponent} from './components/navbar/navbar.component';
import {SharedComponent} from './shared.component';
import {MatComponentsModule} from '../mat-components.Module/mat-components.module';
import {AuthService} from '../authentication.Module/services/auth.service';
import {TableComponent} from './components/table/table.component';
import {LoginGuard} from '../authentication.Module/guards/login.guard';
import {LoadingBarRouterModule} from '@ngx-loading-bar/router';
import {ProfileComponent} from './components/profile/profile.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {NgChartsModule, NgChartsConfiguration} from 'ng2-charts';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {TranslateModule} from '@ngx-translate/core';
import {AutocompleteComponent} from './components/autocomplete/autocomplete.component';
import {DeleteDialogComponent} from './components/delete-dialog/delete-dialog.component';
import {ServiceFactory} from './classes/ServiceFactory';

@NgModule({
	declarations: [SharedComponent, ProfileComponent, FooterComponent, NavbarComponent, NotfoundComponent, TableComponent, DashboardComponent, AutocompleteComponent, DeleteDialogComponent],
	imports: [NgChartsModule, LoadingBarRouterModule, CommonModule, SharedRoutingModule, MatComponentsModule, ReactiveFormsModule, FormsModule, TranslateModule],
	exports: [TableComponent, AutocompleteComponent],
	providers: [LoginGuard, AuthService, ToastrService, {provide: NgChartsConfiguration, useValue: {generateColors: false}}, ServiceFactory],
})
export class SharedModule {}
