import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeacherComponent } from './teacher.component';
import { TeacherDetailsComponent } from './components/teacher-details/teacher-details.component';

const routes: Routes = [
    {
        path: '',
        title: 'المدرسين',
        children: [
            { path: '', component: TeacherComponent, pathMatch: 'full' },
            { path: ':id', component: TeacherDetailsComponent, title: 'تفاصيل المدرس' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TeacherRoutingModule {}
