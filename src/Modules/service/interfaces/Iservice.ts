import {Material} from 'src/Modules/material/interfaces/Imaterial';
import {ServiceType} from 'src/Modules/serviceType/interFaces/IserviceType';

export interface Service {
	id: number;
	name: string;
	materialId: number;
	material: Material;
	serivceTypeId: number;
	serviceType: ServiceType;
	noteComponents: []; ///////////
	orderDetails: []; ///////////
	createdOn: any;
	createdBy: any;
	modifiedBy: any;
	modifiedOn: any;
	isDeleted: boolean;
	servicePricePerClientTypes: any;
}
