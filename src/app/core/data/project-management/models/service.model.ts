import { ServicePricePerClientType } from 'src/app/core/data/project-management/models/ServicePricePerClientType.model';
import { ServiceMaterial } from './serviceMaterial.model';

export interface Service {
  id: number;
  name: string;
  serviceMaterials: ServiceMaterial[];
  servicePricePerClientTypes: ServicePricePerClientType[];
  serviceTypeId: number;
  serviceType: string;
  originalPrice: number;
}
