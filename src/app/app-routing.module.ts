import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginGuard} from "src/Modules/authentication.Module/guards/login.guard";

const routes: Routes = [
	{
		path: "auth",
		loadChildren: () => import("../Modules/authentication.Module/auth.module").then((m) => m.AuthModule),
	},
	{
		path: "",
		loadChildren: () => import("../Modules/shared/shared.module").then((m) => m.SharedModule),
		canLoad: [LoginGuard],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
