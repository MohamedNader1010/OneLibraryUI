import {_HttpOptions} from "./../../../Persistents/consts";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {shareReplay} from "rxjs";
import {Login} from "../interfaces/Ilogin";
import {SharedService} from "./../../shared/services/shared.service";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	public isLogged: boolean = !!localStorage.getItem("Securitytoken");
	public username: string = localStorage.getItem("userName") ?? "";
	constructor(private http: HttpClient, private data: SharedService) {}
	login(login: Login) {
		// return this.http.post<Login>(`${this.data.apiUrl}Auth/Login`, login, _HttpOptions).pipe(shareReplay());
		return true;
	}
}
