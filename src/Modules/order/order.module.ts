import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatComponentsModule} from "../mat-components.Module/mat-components.module";
import {SharedModule} from "../shared/shared.module";
import {AddEditComponent} from "./components/add-edit/add-edit.component";
import {AllComponent} from "./components/all/all.component";
import {OrderComponent} from "./order.component";
import {OrderRoutingModule} from "./routing/service-routing.module";
import {OrderService} from "./services/orders.service";

@NgModule({
	declarations: [OrderComponent, AllComponent, AddEditComponent],
	imports: [FormsModule, ReactiveFormsModule, CommonModule, OrderRoutingModule, SharedModule, MatComponentsModule],
	providers: [OrderService],
})
export class OrderModule {}
