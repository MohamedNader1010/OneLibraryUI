import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatComponentsModule } from '../../../shared/modules/mat-components.Module/mat-components.module';
import { SharedModule } from '../../../shared/shared.module';
import { LoginGuard } from '../../authentication/guards/login.guard';
import { MaterialService } from '../../data/project-management/repositories/material.service';
import { MaterialFormDialogComponent } from './components/material-form-dialog/material-form-dialog.component';
import { MaterialComponent } from './material.component';
import { MaterialsRoutingModule } from './routing/material-routing.module';

@NgModule({
  declarations: [MaterialComponent, MaterialFormDialogComponent],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MaterialsRoutingModule, MatComponentsModule, SharedModule, TranslateModule],
  providers: [LoginGuard, MaterialService],
})
export class MaterialModule {}
