import {NotfoundComponent} from './components/notfound/notfound.component';
import {FooterComponent} from './components/footer/footer.component';
import {DialogComponent} from './components/dialog/dialog.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedRoutingModule} from './routing/shared-routing.module';
import {NavbarComponent} from './components/navbar/navbar.component';
import {SharedComponent} from './shared.component';
import {MatComponentsModule} from '../mat-components.Module/mat-components.module';
import {AuthService} from '../authentication.Module/services/auth.service';
import {TableComponent} from './components/table/table.component';
import {LoginGuard} from '../authentication.Module/guards/login.guard';

@NgModule({
	declarations: [SharedComponent, DialogComponent, FooterComponent, NavbarComponent, NotfoundComponent, TableComponent],
	imports: [CommonModule, SharedRoutingModule, MatComponentsModule],
	exports: [TableComponent],
	providers: [LoginGuard, AuthService],
})
export class SharedModule {}
