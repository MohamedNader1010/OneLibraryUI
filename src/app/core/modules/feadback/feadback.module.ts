import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeadbackRoutingModule } from './routing/feadback-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatComponentsModule } from '../../../shared/modules/mat-components.Module/mat-components.module';
import { SharedModule } from '../../../shared/shared.module';
import { LoginGuard } from '../../authentication/guards/login.guard';
import { FormDialogComponent } from './components/formDialog/form.dialog.component';
import { FeadbackComponent } from './feadback.component';

@NgModule({
  declarations: [FeadbackComponent, FormDialogComponent],
  imports: [TranslateModule, CommonModule, FeadbackRoutingModule, FormsModule, ReactiveFormsModule, CommonModule, SharedModule, MatComponentsModule],
  providers: [LoginGuard],
})
export class FeadbackModule {}
