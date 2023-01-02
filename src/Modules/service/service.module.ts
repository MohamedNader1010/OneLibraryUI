import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {ServiceRoutingModule} from "./routing/service-routing.module";
import {ServiceComponent} from "./service.component";
import {AllComponent} from "./components/all/all.component";
import {AddEditComponent} from "./components/add-edit/add-edit.component";

@NgModule({
	declarations: [ServiceComponent, AllComponent, AddEditComponent],
	imports: [CommonModule, ServiceRoutingModule],
})
export class ServiceModule {}
