import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { SharedComponent } from './shared.component';

const routes: Routes = [
    {
        path: '',
        component: SharedComponent,
        title: 'الرئيسية',
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            {
                path: 'clients',
                loadChildren: () => import('../modules/client/client.module').then((m) => m.ClientModule)
            },
            {
                path: 'teachers',
                loadChildren: () => import('../modules/teacher/teacher.module').then((m) => m.TeacherModule)
            }
            // { path: 'services', loadChildren: () => import('../modules/service/service.module').then((m) => m.ServiceModule)  },
            // { path: 'orders', loadChildren: () => import('../modules/order/order.module').then((m) => m.OrderModule)  },
            // { path: 'materials', loadChildren: () => import('../modules/material/material.module').then((m) => m.MaterialModule)  },
            // { path: 'service-types', loadChildren: () => import('../modules/service-type/service-type.module').then((m) => m.ServiceTypeModule)  },
            // { path: 'client/types', loadChildren: () => import('../modules/client-type/client-type.module').then((m) => m.ClientTypeModule)  },
            // { path: 'client/feedback', loadChildren: () => import('../modules/feedback/feedback.module').then((m) => m.FeedbackModule)  },
            // { path: 'notes', loadChildren: () => import('../modules/note/note.module').then((m) => m.NoteModule)  },
            // { path: 'employees', loadChildren: () => import('../modules/employee/employee.module').then((m) => m.EmployeeModule)  },
            // { path: 'attendance', loadChildren: () => import('../modules/attendance/attendance.module').then((m) => m.AttendanceModule) },
            // {
            //     path: 'material-transactions',
            //     loadChildren: () => import('../modules/material-tracking/materialTracking.module').then((m) => m.materialTrackingModule)
            // },
            // { path: 'transactions', loadChildren: () => import('../modules/transactions/transactions.module').then((m) => m.transactionsModule)  },
            // { path: 'bank', loadChildren: () => import('../modules/fiscal-year/fiscal-year.module').then((m) => m.FiscalYearModule), data: { roles: ['Admin', 'Manager'] }  },
            // { path: 'shifts', loadChildren: () => import('../modules/shift/shifts.module').then((m) => m.ShiftsModule)  },
            // { path: 'suppliers', loadChildren: () => import('../modules/supplier/supplier.module').then((m) => m.SupplierModule)  },
            // { path: 'profile', component: ProfileComponent, title: 'الصفحة الشخصية', canActivate: [LoginGuard] },
        ]
    },
    { path: '**', component: NotfoundComponent, title: '404 - not found' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SharedRoutingModule {}
