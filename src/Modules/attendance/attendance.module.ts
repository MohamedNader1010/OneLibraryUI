import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AttendanceRoutingModule} from './routing/attendance-routing.module';
import {AllComponent} from './components/all/all.component';
import {AttendanceComponent} from './attendance.component';

@NgModule({
	declarations: [AllComponent, AttendanceComponent],
	imports: [CommonModule, AttendanceRoutingModule],
})
export class AttendanceModule {}
