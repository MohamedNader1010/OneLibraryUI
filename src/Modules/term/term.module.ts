import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginGuard} from '../authentication.Module/guards/login.guard';
import {MatComponentsModule} from '../mat-components.Module/mat-components.module';
import {SharedModule} from '../shared/shared.module';
import {AddEditComponent} from './components/add-edit/add-edit.component';
import {AllComponent} from './components/all/all.component';
import {CanDeactivateGuard} from './guards/canDeactivateForm.guard';
import {TermRoutingModule} from './routing/term-routing.module';
import {TermService} from './services/term.service';
import {TermComponent} from './term.component';

@NgModule({
	declarations: [TermComponent, AllComponent, AddEditComponent],
	imports: [FormsModule, ReactiveFormsModule, CommonModule, TermRoutingModule, MatComponentsModule, SharedModule],
	providers: [LoginGuard, TermService, CanDeactivateGuard],
})
export class TermModule {}
