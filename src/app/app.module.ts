import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {CommonModule} from "@angular/common";
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {TokenInterceptor} from "./token.interceptor";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {LoginGuard} from "src/Modules/authentication.Module/guards/login.guard";

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, HttpClientModule, AppRoutingModule, CommonModule, BrowserAnimationsModule],
	bootstrap: [AppComponent],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptor,
			multi: true,
		},
		LoginGuard,
	],
})
export class AppModule {}
