import { IBranchStockServiceDTO } from './branch-stock-service-dto.interface';
import { IServicePricePerClientTypeDTO } from './service-price-per-client-type-dto.interface';

export interface IServiceDTO {
    id: string;
    name: string;
    serviceType: string;
    serviceTypeId: string;
    originalPrice: number;
    teacherPrice?: number;
    branchStockServices: IBranchStockServiceDTO[];
    servicePricePerClientTypes: IServicePricePerClientTypeDTO[];
}
