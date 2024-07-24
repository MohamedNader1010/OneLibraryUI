import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoteFormDialogComponent } from './components/note-form-dialog/note-form-dialog.component';
import { TranslateModule } from '@ngx-translate/core';
import { LoginGuard } from '../../core/authentication/guards/login.guard';
import { NoteService } from '../../core/data/services/note.service';
import { MatComponentsModule } from '../../shared/modules/mat-components.module';
import { SharedModule } from '../../shared/shared.module';
import { NoteRoutingModule } from './note-routing.module';
import { NoteComponent } from './note.component';

@NgModule({
  declarations: [NoteComponent, NoteFormDialogComponent],
  imports: [TranslateModule, FormsModule, ReactiveFormsModule, CommonModule, NoteRoutingModule, SharedModule, MatComponentsModule],
  providers: [LoginGuard, NoteService],
})
export class NoteModule {}
