export interface Auth {
	message: string;
	isAuthentiated: boolean;
	username: string;
	roles: string[];
	token: string;
	expiresOn: Date;
	refreshToken: string;
	refreshTokenExpiration: Date;
}
