export interface ServicePricePerClientType {
	id: number;
	price: number;
	originalPrice: number;
	serviceId: number;
	service: string;
	clientTypeId: number;
	client: string;
}
