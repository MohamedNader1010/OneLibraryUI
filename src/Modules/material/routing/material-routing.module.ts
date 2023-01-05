import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MaterialComponent} from "../material.component";
import {AllComponent} from "../components/all/all.component";
import {AddEditComponent} from "../components/add-edit/add-edit.component";

const routes: Routes = [
	{
		path: "",
		component: MaterialComponent,
		title: "materils",
		children: [
			{path: "all", component: AllComponent, title: "all materils"},
			{path: "new", component: AddEditComponent, title: "add new materil"},
			{path: "edit", component: AddEditComponent, title: "edit materil data"},
			{path: "", redirectTo: "all", pathMatch: "full"},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class MaterialsRoutingModule {}
