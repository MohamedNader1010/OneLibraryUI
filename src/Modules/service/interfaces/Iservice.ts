import {ServiceMaterial} from './IserviceMaterial';

export interface Service {
	id: number;
	name: string;
	materialId: number;
	serviceMaterial: ServiceMaterial[];
	serviceTypeId: number;
	serviceType: string;
}
