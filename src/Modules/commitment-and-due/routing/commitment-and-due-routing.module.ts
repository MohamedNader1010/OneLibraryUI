import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommitmentAndDueComponent } from '../commitment-and-due.component';
import { LoginGuard } from '../../authentication.Module/guards/login.guard';

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
