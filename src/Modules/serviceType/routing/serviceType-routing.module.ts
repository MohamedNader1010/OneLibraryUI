import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AllComponent} from "../components/all/all.component";
import {AddEditComponent} from "../components/add-edit/add-edit.component";
import {ServiceTypeComponent} from "../serviceType.component";

const routes: Routes = [
	{
		path: "",
		component: ServiceTypeComponent,
		title: "service Types",
		children: [
			{path: "all", component: AllComponent, title: "all service Types"},
			{path: "new", component: AddEditComponent, title: "add new service Type"},
			{path: "edit", component: AddEditComponent, title: "edit service Type data"},
			{path: "", redirectTo: "all", pathMatch: "full"},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ServiceTypesRoutingModule {}
