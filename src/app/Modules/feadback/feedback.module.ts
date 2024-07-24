import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbackComponent } from './feedback.component';
import { ClientFeedbackFormDialogComponent } from './components/client-feedback-form-dialog/client-feedback-form.dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LoginGuard } from '../../core/authentication/guards/login.guard';
import { MatComponentsModule } from '../../shared/modules/mat-components.module';
import { SharedModule } from '../../shared/shared.module';
import { FeedbackRoutingModule } from './feedback-routing.module';

@NgModule({
  declarations: [FeedbackComponent, ClientFeedbackFormDialogComponent],
  imports: [TranslateModule, CommonModule, FeedbackRoutingModule, FormsModule, ReactiveFormsModule, CommonModule, SharedModule, MatComponentsModule],
  providers: [LoginGuard],
})
export class FeedbackModule {}
