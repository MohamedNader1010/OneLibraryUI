import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginGuard} from '../authentication.Module/guards/login.guard';
import {MatComponentsModule} from '../mat-components.Module/mat-components.module';
import {SharedModule} from '../shared/shared.module';
import {AddEditComponent} from './components/add-edit/add-edit.component';
import {AllComponent} from './components/all/all.component';
import {CanDeactivateGuard} from './guards/canDeactivateForm.guard';
import {StageRoutingModule} from './routing/stage-routing.module';
import {StageService} from './services/stage.service';
import {StageComponent} from './stage.component';

@NgModule({
	declarations: [StageComponent, AllComponent, AddEditComponent],
	imports: [FormsModule, ReactiveFormsModule, CommonModule, StageRoutingModule, MatComponentsModule, SharedModule],
	providers: [LoginGuard, StageService, CanDeactivateGuard],
})
export class StageModule {}
