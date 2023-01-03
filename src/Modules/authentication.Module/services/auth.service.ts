import { _HttpOptions } from './../../../Persistents/consts';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {shareReplay} from "rxjs";
import {Login} from "../interfaces/Ilogin";
import {SharedService} from "./../../shared/services/shared.service";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	constructor(private http: HttpClient, private data: SharedService) {}
	
	public isLogged = !!localStorage.getItem("Securitytoken");
	public username = localStorage.getItem("userName");
	
	login(login: Login) {
		_HttpOptions
		// return this.http.post<Login>(`${this.data.apiUrl}Auth/Login`, login, httpOptions).pipe(shareReplay());
		return true;
	}
}
