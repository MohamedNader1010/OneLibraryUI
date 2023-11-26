import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '../../../authentication/guards/login.guard';
import { CommitmentAndDueComponent } from '../commitment-and-due.component';

const routes: Routes = [
  {
    path: '',
    component: CommitmentAndDueComponent,
    title: 'الالتزامات و الاستحقاقات',
    canActivateChild: [LoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommitmentAndDueRoutingModule {}
