import {OrderDetail} from "./IorderDetail";
import {OrderTransaction} from "./IorderTransaction";
export interface Order {
	id: number;
	totalPrice: string;
	rest: string;
	paid: string;
	status: number;
	clientId: number;
	orderDetails: OrderDetail[];
	ordertransaction: OrderTransaction;
}
