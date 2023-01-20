import {Client} from 'src/Modules/client/interFaces/Iclient';
import {OrderDetail} from './IorderDetail';
import {OrderTransaction} from './IorderTransaction';
export interface Order {
	id: number;
	totalPrice: string;
	rest: string;
	paid: string;
	status: number;
	clientId: number;
	client: Client;
	orderDetails: OrderDetail[];
	ordertransaction: OrderTransaction;
}
