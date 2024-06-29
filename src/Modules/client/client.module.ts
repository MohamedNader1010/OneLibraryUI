import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginGuard } from '../authentication.Module/guards/login.guard';
import { MatComponentsModule } from '../mat-components.Module/mat-components.module';
import { SharedModule } from '../shared/shared.module';
import { ClientComponent } from './client.component';
import { ClientRoutingModule } from './routing/client-routing.module';
import { ClientService } from './services/client.service';
import { ClientFormDialogComponent } from './components/client-form-dialog/client-form-dialog.component';
import { TeacherAccountComponent } from './components/teacherAccount/teacherAccount.component'
import { PayTeacherProfitComponent } from './components/payTeacherProfit/payTeacherProfit.component';
import { ClientBulkPaymentFormComponent } from './components/client-bulk-payment-form/client-bulk-payment-form.component'

@NgModule({
	declarations: [ClientComponent, TeacherAccountComponent, ClientFormDialogComponent,PayTeacherProfitComponent, ClientBulkPaymentFormComponent],
	imports: [
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		ClientRoutingModule,
		MatComponentsModule,
		SharedModule,
		TranslateModule
	],
	providers: [LoginGuard, ClientService],
})
export class ClientModule { }
