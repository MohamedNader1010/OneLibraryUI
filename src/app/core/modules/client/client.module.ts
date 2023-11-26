import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatComponentsModule } from '../../../shared/modules/mat-components.Module/mat-components.module';
import { SharedModule } from '../../../shared/shared.module';
import { LoginGuard } from '../../authentication/guards/login.guard';
import { ClientService } from '../../data/project-management/repositories/client.service';
import { ClientComponent } from './client.component';
import { ClientFormDialogComponent } from './components/client-form-dialog/client-form-dialog.component';
import { PayTeacherProfitComponent } from './components/payTeacherProfit/payTeacherProfit.component';
import { TeacherAccountComponent } from './components/teacherAccount/teacherAccount.component';
import { ClientRoutingModule } from './routing/client-routing.module';

@NgModule({
  declarations: [ClientComponent, TeacherAccountComponent, ClientFormDialogComponent, PayTeacherProfitComponent],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, ClientRoutingModule, MatComponentsModule, SharedModule, TranslateModule],
  providers: [LoginGuard, ClientService],
})
export class ClientModule {}
