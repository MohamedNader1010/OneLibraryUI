import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AllComponent } from "../service-price-per-client-type/Components/all/all.component";
import { AddEditComponent } from "./Components/add-edit/add-edit.component";
// import { EditComponent} from '../service-price-per-client-type/Components/';

const routes: Routes = [
  {
    path: "",
    component: AllComponent,
  },
  { path: "edit", component: AddEditComponent },
  { path: "new", component: AddEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicePricePerClientTypeRoutingModule {}
