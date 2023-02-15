export interface Auth {
	id: number;
	message: string;
	isAuthentiated: boolean;
	iSCheckedIn: boolean;
	isSuccess: boolean;
	username: string;
	email: string;
	roles: string[];
	token: string;
	expiresOn: Date;
	refreshToken: string;
	refreshTokenExpiration: Date;
}
