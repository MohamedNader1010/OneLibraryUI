export interface ServicePricePerClientType {

  id: number;
  price: string;
  serviceId: string;
  clientTypeId: string;
}

export interface ServicePrice extends ServicePricePerClientType {
  service: string;
  clientType: string;

	id: number;
	price: number;
	originalPrice: number;
	serviceId: number;
	service: string;
	clientTypeId: number;
	client: string;

}
