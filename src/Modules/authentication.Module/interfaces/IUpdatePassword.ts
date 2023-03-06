export interface UpdatePassword {
	id: string;
	old: string;
	newPassword: string;
	confirmPassword: string;
}
