import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierRoutingModule } from './routing/supplier-routing.module';
import { SupplierComponent } from './suppliers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatComponentsModule } from '../../../shared/modules/mat-components.Module/mat-components.module';
import { SharedModule } from '../../../shared/shared.module';
import { SupplierFormDialogComponent } from './components/supplier-form-dialog/supplier-form-dialog.component';

@NgModule({
  declarations: [SupplierComponent, SupplierFormDialogComponent],
  imports: [CommonModule, SupplierRoutingModule, FormsModule, ReactiveFormsModule, MatComponentsModule, SharedModule, TranslateModule],
})
export class SupplierModule {}
