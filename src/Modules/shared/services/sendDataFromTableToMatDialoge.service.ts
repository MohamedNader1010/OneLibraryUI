import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SendDataFromTableToMatDialoge {
  id: number  = 0;
  constructor() {}
  setOrderId(id: number) {
    this.id = id;
  }
  getOrderId(): number{
    return this.id;
  }
}
