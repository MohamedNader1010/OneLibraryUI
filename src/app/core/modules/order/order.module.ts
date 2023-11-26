import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatComponentsModule } from '../../../shared/modules/mat-components.Module/mat-components.module';
import { SharedModule } from '../../../shared/shared.module';
import { LoginGuard } from '../../authentication/guards/login.guard';
import { DetailsComponent } from './components/details/details.component';
import { OrderFormDialogComponent } from './components/order-form-dialog/order-form-dialog.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { ReturnsComponent } from './components/returns/returns.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { OrderComponent } from './order.component';
import { OrderRoutingModule } from './routing/order-routing.module';

@NgModule({
  declarations: [OrderComponent, TransactionComponent, DetailsComponent, ReturnsComponent, OrderFormDialogComponent, ReservationsComponent],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, OrderRoutingModule, SharedModule, MatComponentsModule, TranslateModule],
  providers: [LoginGuard],
})
export class OrderModule {}
