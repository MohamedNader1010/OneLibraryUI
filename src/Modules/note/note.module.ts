import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatComponentsModule} from '../mat-components.Module/mat-components.module';
import {SharedModule} from '../shared/shared.module';
import {AddEditComponent} from './components/add-edit/add-edit.component';
import {AllComponent} from './components/all/all.component';
import {DetailsComponent} from './components/single/details.component';
import {OrderComponent} from './note.component';
import {OrderRoutingModule} from './routing/note-routing.module';
import {OrderService} from './services/note.service';
import {AllByTeacherIdComponent} from './components/allByTeacherId/allByTeacherId.component';

@NgModule({
	declarations: [OrderComponent, AllComponent, AddEditComponent, DetailsComponent, AllByTeacherIdComponent],
	imports: [FormsModule, ReactiveFormsModule, CommonModule, OrderRoutingModule, SharedModule, MatComponentsModule],
	providers: [OrderService],
})
export class OrderModule {}
