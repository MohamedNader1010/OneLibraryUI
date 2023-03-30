import {NotfoundComponent} from './components/notfound/notfound.component';
import {FooterComponent} from './components/footer/footer.component';
import {DialogComponent} from './components/dialog/dialog.component';
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

@NgModule({
	declarations: [SharedComponent, ProfileComponent, DialogComponent, FooterComponent, NavbarComponent, NotfoundComponent, TableComponent],
	imports: [LoadingBarRouterModule, CommonModule, SharedRoutingModule, MatComponentsModule, ReactiveFormsModule, FormsModule],
	exports: [TableComponent],
	providers: [LoginGuard, AuthService, ToastrService],
})
export class SharedModule {}
