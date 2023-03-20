export interface Auth {
	id: string;
	isCheckedIn: boolean;
	isSuccess: boolean;
	username: string;
	email: string;
	roles: string[];
	token: string;
	expiresOn: Date;
	refreshToken: string;
	refreshTokenExpiration: Date;
}
