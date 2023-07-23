import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from "../../authentication.Module/guards/login.guard";
import { BankComponent } from "../bank.component";

const routes: Routes = [
	{
		path: '',
		component: BankComponent,
		title: 'البنك',
		canActivateChild: [LoginGuard],
	},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankRoutingModule { }
