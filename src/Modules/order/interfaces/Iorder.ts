import {OrderDetail} from './IorderDetail';
import {OrderTransaction} from './IorderTransaction';
export interface Order {
	id: number;
	totalPrice: string;
	finalPrice: string;
	rest: string;
	paid: string;
	discountPercent: string;
	discount: string;
	remarks: string;
	status: number;
	clientId: number;
	client: string;
	orderDetails: OrderDetail[];
	ordertransaction: OrderTransaction[];
}
