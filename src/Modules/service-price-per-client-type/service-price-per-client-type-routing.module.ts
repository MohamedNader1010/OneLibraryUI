import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AllComponent} from '../service-price-per-client-type/Components/all/all.component';
// import { EditComponent} from '../service-price-per-client-type/Components/';


const routes: Routes = [
  {
    path: '',
    component: AllComponent 
    // children: [
    //   {path: 'edit' , component: }
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicePricePerClientTypeRoutingModule { }
