import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatComponentsModule} from '../mat-components.Module/mat-components.module';
import {SharedModule} from '../shared/shared.module';
import {AddEditComponent} from './components/add-edit/add-edit.component';
import {AllComponent} from './components/all/all.component';
import {DetailsComponent} from './components/single/details.component';
import {NoteComponent} from './note.component';
import {NoteRoutingModule} from './routing/note-routing.module';
import {NoteService} from './services/note.service';
import {AllByTeacherIdComponent} from './components/allByTeacherId/allByTeacherId.component';
import {CanDeactivateGuard} from './guards/canDeactivateForm.guard';
import {LoginGuard} from '../authentication.Module/guards/login.guard';
import { NoteFormDialogComponent } from './components/note-form-dialog/note-form-dialog.component';

@NgModule({
	declarations: [NoteComponent, AllComponent, AddEditComponent, DetailsComponent, AllByTeacherIdComponent, NoteFormDialogComponent],
	imports: [FormsModule, ReactiveFormsModule, CommonModule, NoteRoutingModule, SharedModule, MatComponentsModule],
	providers: [LoginGuard, NoteService, CanDeactivateGuard],
})
export class NoteModule {}
