import {ClientType} from "../../clientType/interFaces/IclientType";
export interface Client {
	id: number;
	name: string;
	phoneNumber: string;
	clientType: ClientType;
}
