export interface IProfileDTO {
  id: string;
  userName?: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email?: string;
  emailConfirmed: boolean;
  phoneNumber?: string;
  title?: string;
  position?: string;
}
