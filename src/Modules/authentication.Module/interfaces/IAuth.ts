export interface Auth {
	id: number;
	message: string;
	isAuthentiated: boolean;
	username: string;
	roles: string[];
	token: string;
	expiresOn: Date;
	refreshToken: string;
	refreshTokenExpiration: Date;
}
