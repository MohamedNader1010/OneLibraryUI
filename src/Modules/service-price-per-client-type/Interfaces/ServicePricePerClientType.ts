export interface ServicePricePerClientType {
  id: number;
  price: string;
  serviceId: string;
  clientTypeId: string;
}

export interface ServicePrice extends ServicePricePerClientType {
  service: string;
  clientType: string;
}
