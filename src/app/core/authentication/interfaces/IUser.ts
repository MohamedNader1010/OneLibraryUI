export interface User {
  id: string;
  accessFailedCount: number;
  userName: string;
  email: string;
  emailConfirmed: boolean;
  phoneNumber: string;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  firstName: string;
  lastName: string;
  createdOn: Date;
  createdBy: string;
  modifiedBy: string;
  modifiedOn: Date;
  deletedBy: string;
  deletedOn: Date;
  isDeleted: boolean;
  title: string;
  position: string;
}
