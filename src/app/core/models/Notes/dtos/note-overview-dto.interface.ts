export interface INoteOverviewDTO {
  id: string;
  name: string;
  quantity: number;
  finalPrice: number;
  clientId: string;
  client: string;
  reservationRequired: boolean;
  teacherPrice: number;
  term?: string;
  stage?: string;
  actualPrice: number;
  originalPrice: number;
  earning: number;
  filePath?: string;
  fileName?: string;
  finalPriceWithoutTeacherPrice?: number;
}
