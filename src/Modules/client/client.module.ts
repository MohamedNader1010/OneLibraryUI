import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatComponentsModule} from "../mat-components.Module/mat-components.module";
import {SharedModule} from "../shared/shared.module";
import {ClientComponent} from "./client.component";
import {AddEditComponent} from "./components/add-edit/add-edit.component";
import {AllComponent} from "./components/all/all.component";
import {ClientRoutingModule} from "./routing/client-routing.module";
import {ClientService} from "./services/client.service";

@NgModule({
	declarations: [ClientComponent, AllComponent, AddEditComponent],
	imports: [FormsModule, ReactiveFormsModule, CommonModule, ClientRoutingModule, MatComponentsModule, SharedModule],
	providers: [ClientService],
})
export class ClientModule {}
