import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginGuard } from '../authentication.Module/guards/login.guard';
import { MatComponentsModule } from '../mat-components.Module/mat-components.module';
import { SharedModule } from '../shared/shared.module';
import { ClientComponent } from './client.component';
import { SingleComponent } from './components/single/single.component';
import { ClientRoutingModule } from './routing/client-routing.module';
import { ClientService } from './services/client.service';
import { ClientFormDialogComponent } from './components/client-form-dialog/client-form-dialog.component';

@NgModule({
	declarations: [ClientComponent, SingleComponent, ClientFormDialogComponent],
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
