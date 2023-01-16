import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicePricePerClientTypeRoutingModule } from './service-price-per-client-type-routing.module';
import { AllComponent } from './Components/all/all.component';
import { SharedModule } from "../shared/shared.module";


@NgModule({
    declarations: [
        AllComponent
    ],
    imports: [
        CommonModule,
        ServicePricePerClientTypeRoutingModule,
        SharedModule
    ]
})
export class ServicePricePerClientTypeModule { }
