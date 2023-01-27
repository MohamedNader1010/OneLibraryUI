import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginGuard} from '../authentication.Module/guards/login.guard';
import {MatComponentsModule} from '../mat-components.Module/mat-components.module';
import {SharedModule} from '../shared/shared.module';
import {ClientComponent} from './client.component';
import {AddEditComponent} from './components/add-edit/add-edit.component';
import {AllComponent} from './components/all/all.component';
import {SingleComponent} from './components/single/single.component';
import {CanDeactivateGuard} from './guards/canDeactivateForm.guard';
import {ClientRoutingModule} from './routing/client-routing.module';
import {ClientService} from './services/client.service';

@NgModule({
	declarations: [ClientComponent, AllComponent, AddEditComponent, SingleComponent],
	imports: [FormsModule, ReactiveFormsModule, CommonModule, ClientRoutingModule, MatComponentsModule, SharedModule],
	providers: [LoginGuard, ClientService, CanDeactivateGuard],
})
export class ClientModule {}
