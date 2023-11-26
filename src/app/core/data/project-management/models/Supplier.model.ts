export interface Supplier {
  id: number;
  name: string;
  phoneNumber: string;
  comment: string;
  totalDue: number;
  paid: string;
  rest: string;
  dues: [];
}
