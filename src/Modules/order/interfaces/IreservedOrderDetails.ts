import {OrderDetail} from './IorderDetail';
export interface ReservedOrderDetails {
	id: number;
	createdOn: Date;
	reservedNotes: ReservedNotes[];
}
export interface ReservedNotes {
	totalQuantity: number;
	noteId: number;
	note: string;
	orderDetails: OrderDetail[];
}
