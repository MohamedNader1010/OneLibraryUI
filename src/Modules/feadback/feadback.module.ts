import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FeadbackRoutingModule} from './routing/feadback-routing.module';
import {FeadbackComponent} from './feadback.component';
import {FormDialogComponent} from './components/formDialog/form.dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginGuard} from '../authentication.Module/guards/login.guard';
import {MatComponentsModule} from '../mat-components.Module/mat-components.module';
import {SharedModule} from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [FeadbackComponent, FormDialogComponent],
  imports: [TranslateModule, CommonModule, FeadbackRoutingModule, FormsModule, ReactiveFormsModule, CommonModule, SharedModule, MatComponentsModule],
  providers: [LoginGuard],
})
export class FeadbackModule {}
