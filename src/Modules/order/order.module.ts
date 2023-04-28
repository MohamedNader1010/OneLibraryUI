import { TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginGuard} from '../authentication.Module/guards/login.guard';
import {MatComponentsModule} from '../mat-components.Module/mat-components.module';
import {SharedModule} from '../shared/shared.module';
import {DetailsComponent} from './components/details/details.component';
import {TransactionComponent} from './components/transaction/transaction.component';
import {OrderComponent} from './order.component';
import {OrderRoutingModule} from './routing/order-routing.module';
import {OrderService} from './services/orders.service';
import {ReturnsComponent} from './components/returns/returns.component';
import { OrderFormDialogComponent } from './components/order-form-dialog/order-form-dialog.component';

@NgModule({
	declarations: [OrderComponent, TransactionComponent, DetailsComponent, ReturnsComponent, OrderFormDialogComponent],
	imports: [
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		OrderRoutingModule,
		SharedModule,
		MatComponentsModule,
		TranslateModule
	],
	providers: [LoginGuard, OrderService],
})
export class OrderModule {}

