import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatComponentsModule} from '../mat-components.Module/mat-components.module';
import {SharedModule} from '../shared/shared.module';
import {AddEditComponent} from './components/add-edit/add-edit.component';
import {AllComponent} from './components/all/all.component';
import {DetailsComponent} from './components/details/details.component';
import {TransactionComponent} from './components/transaction/transaction.component';
import {CanDeactivateGuard} from './guards/canDeactivateForm.guard';
import {OrderComponent} from './order.component';
import {OrderRoutingModule} from './routing/order-routing.module';
import {OrderService} from './services/orders.service';

@NgModule({
	declarations: [OrderComponent, AllComponent, AddEditComponent, TransactionComponent, DetailsComponent],
	imports: [FormsModule, ReactiveFormsModule, CommonModule, OrderRoutingModule, SharedModule, MatComponentsModule],
	providers: [OrderService, CanDeactivateGuard],
})
export class OrderModule {}
