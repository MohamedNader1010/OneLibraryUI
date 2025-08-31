import { IBranchStockServiceRequestDTO } from '../dtos/branch-stock-service-request-dto.interface';
import { IServicePricePerClientTypeRequestDTO } from '../dtos/service-price-per-client-type-request-dto.interface';

export interface IUpdateServiceCommand {
    id: string;
    name: string;
    serviceTypeId: string;
    teacherPrice?: number;
    servicePricePerClientTypes: IServicePricePerClientTypeRequestDTO[];
    branchStockServices: IBranchStockServiceRequestDTO[];
}
