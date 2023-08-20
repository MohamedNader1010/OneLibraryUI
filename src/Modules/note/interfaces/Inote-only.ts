export interface NoteOnly {
  id: number;
  name: string;
  quantity: number;
  clientId: number;
  client: string;
  clientTypeId: number;
  clientType: string;
  finalPrice: number;
  fileName: string;
  filePath: string;
  isVisible: boolean;
}
