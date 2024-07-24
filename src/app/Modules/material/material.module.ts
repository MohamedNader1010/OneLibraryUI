import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialComponent } from './material.component';
import { MaterialFormDialogComponent } from './components/material-form-dialog/material-form-dialog.component';
import { TranslateModule } from '@ngx-translate/core';
import { LoginGuard } from '../../core/authentication/guards/login.guard';
import { MaterialService } from '../../core/data/services/material.service';
import { MatComponentsModule } from '../../shared/modules/mat-components.module';
import { SharedModule } from '../../shared/shared.module';
import { MaterialsRoutingModule } from './material-routing.module';

@NgModule({
  declarations: [MaterialComponent, MaterialFormDialogComponent],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MaterialsRoutingModule, MatComponentsModule, SharedModule, TranslateModule],
  providers: [LoginGuard, MaterialService],
})
export class MaterialModule {}
