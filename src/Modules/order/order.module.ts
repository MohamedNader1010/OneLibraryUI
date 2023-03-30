import { TranslateModule } from '@ngx-translate/core';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginGuard} from '../authentication.Module/guards/login.guard';
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
import { ReturnsComponent } from './components/returns/returns.component';

@NgModule({
	declarations: [OrderComponent, AllComponent, AddEditComponent, TransactionComponent, DetailsComponent, ReturnsComponent],
	imports: [FormsModule, ReactiveFormsModule, CommonModule, OrderRoutingModule, SharedModule, MatComponentsModule, TranslateModule],
	providers: [LoginGuard, OrderService, CanDeactivateGuard],
})
export class OrderModule {}