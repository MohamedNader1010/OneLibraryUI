import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
	{
		path: "auth",
		loadChildren: () => import("../Modules/authentication.Module/auth.module").then((m) => m.AuthModule),
	},
	{
		path: "",
		loadChildren: () => import("../Modules/shared/shared.module").then((m) => m.SharedModule),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
