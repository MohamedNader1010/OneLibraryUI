import { Status } from './../Enums/status';
export interface OrderDetail {
	id: number;
	price: string;
	serviceId: number;
	service: string;
	noteId: number;
	note: string;
	orderId: number;
	quantity:number;
	orderStatus: Status
}
