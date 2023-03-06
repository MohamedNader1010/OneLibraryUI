export interface User {
	id: string;
	accessFailedCount: number;
	userName: string;
	email: string;
	emailConfimed: boolean;
	phoneNumber: string;
	phoneNumberConfimed: boolean;
	twoFactorEnabled: boolean;
	firstName: string;
	lastName: string;
	status: boolean;
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
