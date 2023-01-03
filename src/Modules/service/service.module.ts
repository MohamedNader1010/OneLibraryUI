import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {ServiceRoutingModule} from "./routing/service-routing.module";
import {ServiceComponent} from "./service.component";
import {AllComponent} from "./components/all/all.component";
import {AddEditComponent} from "./components/add-edit/add-edit.component";
import {MatComponentsModule} from "./../mat-components.Module/mat-components.module";
import {ServicesService} from "./services/services.service";

@NgModule({
	declarations: [ServiceComponent, AllComponent, AddEditComponent],
	imports: [CommonModule, ServiceRoutingModule, MatComponentsModule],
	providers: [ServicesService],
})
export class ServiceModule {}
