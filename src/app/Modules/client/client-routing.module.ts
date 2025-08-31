import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './client.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';

const routes: Routes = [
    {
        path: '',
        title: 'العملاء',
        children: [
            { path: '', component: ClientComponent, pathMatch: 'full' },
            { path: ':id', component: ClientDetailsComponent, title: 'تفاصيل العميل' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientRoutingModule {}
