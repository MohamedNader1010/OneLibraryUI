import {ServicePricePerClientType} from 'src/Modules/service-price-per-client-type/Interfaces/ServicePricePerClientType';
import {ServiceMaterial} from './IserviceMaterial';

export interface Service {
	id: number;
	name: string;
	serviceMaterials: ServiceMaterial[];
	servicePricePerClientTypes: ServicePricePerClientType[];
	serviceTypeId: number;
	serviceType: string;
	originalPrice: number;
}
