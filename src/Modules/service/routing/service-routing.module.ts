import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ServiceComponent} from "../service.component";
import {AllComponent} from "./../components/all/all.component";
import {AddEditComponent} from "./../components/add-edit/add-edit.component";

const routes: Routes = [
	{
		path: "",
		component: ServiceComponent,
		title: "services",
		children: [
			{path: "all", component: AllComponent, title: "all services"},
			{path: "new", component: AddEditComponent, title: "add new service"},
			{path: "edit", component: AddEditComponent, title: "edit service's data"},
			{path: "", redirectTo: "all", pathMatch: "full"},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ServiceRoutingModule {}
