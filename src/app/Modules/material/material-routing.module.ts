import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '../../core/authentication/guards/login.guard';
import { MaterialComponent } from './material.component';

const routes: Routes = [
  {
    path: '',
    component: MaterialComponent,
    title: 'الخامات',
    canActivateChild: [LoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaterialsRoutingModule {}
