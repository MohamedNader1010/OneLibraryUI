import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsComponent } from './components/details/details.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { OrderComponent } from './order.component';
import { ReturnsComponent } from './components/returns/returns.component';
import { OrderFormDialogComponent } from './components/order-form-dialog/order-form-dialog.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { UnfinishedOrdersComponent } from './components/unfinished-orders/unfinished-orders.component';
import { LoginGuard } from '../../core/authentication/guards/login.guard';
import { MatComponentsModule } from '../../shared/modules/mat-components.module';
import { SharedModule } from '../../shared/shared.module';
import { OrderRoutingModule } from './order-routing.module';

@NgModule({
  declarations: [OrderComponent, TransactionComponent, DetailsComponent, ReturnsComponent, OrderFormDialogComponent, ReservationsComponent, UnfinishedOrdersComponent],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, OrderRoutingModule, SharedModule, MatComponentsModule, TranslateModule],
  providers: [LoginGuard],
})
export class OrderModule {}
