import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {NotfoundComponent} from "../components/notfound/notfound.component";
import {SharedComponent} from "../shared.component";

const routes: Routes = [
	{
		path: "",
		component: SharedComponent,
		title: "dashboard",
		children: [
			{path: "services", loadChildren: () => import("../../service/service.module").then((m) => m.ServiceModule)},
			{path: "orders", loadChildren: () => import("../../order/order.module").then((m) => m.OrderModule)},
			{path: "materials", loadChildren: () => import("../../material/material.module").then((m) => m.MaterialModule)},
			{path: "serviceTypes", loadChildren: () => import("../../serviceType/serviceType.module").then((m) => m.ServiceTypeModule)},
			{path: "clients", loadChildren: () => import("../../client/client.module").then((m) => m.ClientModule)},
			{path: "clientTypes", loadChildren: () => import("../../clientType/clientType.module").then((m) => m.ClientTypeModule)},
		],
	},
	{path: "**", component: NotfoundComponent, title: "404 - not found"},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class SharedRoutingModule {}
