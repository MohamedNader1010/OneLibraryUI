import {Injectable} from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class SharedService {
	readonly apiUrl = "https://localhost:7222/api/";
	constructor() {}
}
