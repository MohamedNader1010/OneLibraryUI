import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatComponentsModule } from '../../shared/mat-components.module';
import { SharedModule } from '../../shared/shared.module';
import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherDetailsComponent } from './components/teacher-details/teacher-details.component';
import { TeacherComponent } from './teacher.component';
import { CreateTeacherFormDialogComponent } from './components/teacher-form-dialog/create-teacher-form-dialog.component';
import { EditTeacherFormDialogComponent } from './components/teacher-form-dialog/edit-teacher-form-dialog.component';
import { AccountingModule } from '../accounting/accounting.module';

@NgModule({
    declarations: [TeacherComponent, CreateTeacherFormDialogComponent, EditTeacherFormDialogComponent, TeacherDetailsComponent],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        AccountingModule,
        TeacherRoutingModule,
        MatComponentsModule,
        SharedModule,
        TranslateModule
    ]
})
export class TeacherModule {}
