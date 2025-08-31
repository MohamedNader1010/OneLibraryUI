export interface IBaseDTO {
  id: string;
  createdOn: Date;
  createdBy: string;
  modifiedBy?: string;
  modifiedOn?: Date;
  isDeleted: boolean;
}
