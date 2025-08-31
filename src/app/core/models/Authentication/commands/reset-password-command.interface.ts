export interface IResetPasswordCommand {
    userId: string;
    token: string;
    newPassword: string;
    confirmPassword: string;
}
