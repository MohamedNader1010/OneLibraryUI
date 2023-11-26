import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatComponentsModule } from '../../../shared/modules/mat-components.Module/mat-components.module';
import { SharedModule } from '../../../shared/shared.module';
import { LoginGuard } from '../../authentication/guards/login.guard';
import { NoteService } from '../../data/project-management/repositories/note.service';
import { NoteFormDialogComponent } from './components/note-form-dialog/note-form-dialog.component';
import { NoteComponent } from './note.component';
import { NoteRoutingModule } from './routing/note-routing.module';

@NgModule({
  declarations: [NoteComponent, NoteFormDialogComponent],
  imports: [TranslateModule, FormsModule, ReactiveFormsModule, CommonModule, NoteRoutingModule, SharedModule, MatComponentsModule],
  providers: [LoginGuard, NoteService],
})
export class NoteModule {}
