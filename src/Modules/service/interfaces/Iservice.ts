import {ServiceMaterial} from './IserviceMaterial';

export interface Service {
	id: number;
	name: string;
	serviceMaterial: ServiceMaterial[];
	serviceTypeId: number;
	serviceType: string;
}
