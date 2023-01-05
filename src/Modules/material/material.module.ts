import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {MatComponentsModule} from "../mat-components.Module/mat-components.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {MaterialComponent} from "./material.component";
import {MaterialService} from "./services/material.service";
import {MaterialsRoutingModule} from "./routing/material-routing.module";
import {AllComponent} from "./components/all/all.component";
import {AddEditComponent} from "./components/add-edit/add-edit.component";

@NgModule({
	declarations: [MaterialComponent, AllComponent, AddEditComponent],
	imports: [FormsModule, ReactiveFormsModule, CommonModule, MaterialsRoutingModule, MatComponentsModule, SharedModule],
	providers: [MaterialService],
})
export class MaterialModule {}
