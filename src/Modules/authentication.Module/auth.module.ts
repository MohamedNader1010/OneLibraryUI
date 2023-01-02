import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatComponentsModule} from "../mat-components.Module/mat-components.module";
import {SharedService} from "../shared/services/shared.service";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {AuthRoutingModule} from "./routing/auth-routing.module";
import {AuthService} from "./services/auth.service";

@NgModule({
	declarations: [LoginComponent, RegisterComponent],
	imports: [CommonModule, AuthRoutingModule, MatComponentsModule, FormsModule, ReactiveFormsModule],
	providers: [AuthService, SharedService],
})
export class AuthModule {}
