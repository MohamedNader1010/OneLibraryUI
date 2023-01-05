import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ServiceTypeComponent} from "./serviceType.component";
import {ServiceTypesRoutingModule} from "./routing/serviceType-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatComponentsModule} from "../mat-components.Module/mat-components.module";
import {MaterialService} from "../material/services/material.service";
import {SharedModule} from "../shared/shared.module";
import {AddEditComponent} from "./components/add-edit/add-edit.component";
import {AllComponent} from "./components/all/all.component";

@NgModule({
	declarations: [ServiceTypeComponent, AllComponent, AddEditComponent],
	imports: [FormsModule, ReactiveFormsModule, CommonModule, ServiceTypesRoutingModule, MatComponentsModule, SharedModule],
	providers: [MaterialService],
})
export class ServiceTypeModule {}
