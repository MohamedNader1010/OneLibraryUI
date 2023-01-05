import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AllComponent} from "../components/all/all.component";
import {AddEditComponent} from "../components/add-edit/add-edit.component";
import {ClientTypeComponent} from "../clientType.component";

const routes: Routes = [
	{
		path: "",
		component: ClientTypeComponent,
		title: "client Types",
		children: [
			{path: "all", component: AllComponent, title: "all client Types"},
			{path: "new", component: AddEditComponent, title: "add new client Type"},
			{path: "edit", component: AddEditComponent, title: "edit client Type data"},
			{path: "", redirectTo: "all", pathMatch: "full"},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ServiceTypesRoutingModule {}
