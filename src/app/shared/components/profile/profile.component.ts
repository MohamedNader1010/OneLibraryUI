import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DestroyableComponentBase } from '../../classes/destroyable-component-base.abstract';
import { AuthService } from '../../../modules/authentication/services/auth.service';
import { LocalStorageKeys } from '../../constants/local-storage-keys.constants';
import { IProfileDTO } from '../../../core/models/Authentication/dtos/profile-dto.interface';
import { UnitOfWorkService } from '../../../core/services/unit-of-work.service';
import { IUpdateProfileCommand } from '../../../core/models/Authentication/commands/update-profile-command.interface';
import { IChangePasswordCommand } from '../../../core/models/Authentication/commands/change-password-command.interface';
import { MatchValidator } from '../../validators/CustomValidators';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends DestroyableComponentBase {
    authService = inject(AuthService);
    unitOfWorkService = inject(UnitOfWorkService);
    fb = inject(FormBuilder);
    toastrService = inject(ToastrService);
    form!: FormGroup;
    passwordForm!: FormGroup;
    hide = true;
    hideNew = true;
    hideConfirm = true;
    submitting: boolean = false;
    submittingPassword: boolean = false;
    IsEdit: boolean = false;
    updatePassword: boolean = false;
    userData!: IProfileDTO;

    baseOnInit() {
        this.form = this.fb.group({
            id: [null],
            firstName: ['', [Validators.required, Validators.maxLength(100)]],
            lastName: ['', [Validators.required, Validators.maxLength(100)]],
            position: [''],
            title: ['', [Validators.required]],
            userName: ['', [Validators.required, Validators.maxLength(100)]],
            email: ['', [Validators.required, Validators.email]],
            phoneNumber: ['', [Validators.required, Validators.pattern('01[0125][0-9]{8}')]]
        });
        this.passwordForm = this.fb.group(
            {
                id: [null],
                oldPassword: ['', [Validators.required]],
                newPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
                confirmPassword: ['', [Validators.required, Validators.maxLength(100)]]
            },
            { validators: MatchValidator('newPassword', 'confirmPassword') }
        );
        this.profileId.setValue(localStorage.getItem(LocalStorageKeys.UID));
        this.PasswordId.setValue(localStorage.getItem(LocalStorageKeys.UID));
        if (this.profileId.value) {
            this.unitOfWorkService.authorization.getProfile().subscribe({
                next: (res) => {
                    this.userData = res.data;
                    this.form.patchValue(this.userData);
                }
            });
        }
    }

    get profileId(): FormControl {
        return this.form.get('id') as FormControl;
    }
    get firstName(): FormControl {
        return this.form.get('firstName') as FormControl;
    }
    get lastName(): FormControl {
        return this.form.get('lastName') as FormControl;
    }
    get position(): FormControl {
        return this.form.get('position') as FormControl;
    }
    get title(): FormControl {
        return this.form.get('title') as FormControl;
    }
    get userName(): FormControl {
        return this.form.get('userName') as FormControl;
    }
    get email(): FormControl {
        return this.form.get('email') as FormControl;
    }
    get phone(): FormControl {
        return this.form.get('phoneNumber') as FormControl;
    }
    get PasswordId(): FormControl {
        return this.passwordForm.get('id') as FormControl;
    }
    get oldPassword(): FormControl {
        return this.passwordForm.get('oldPassword') as FormControl;
    }
    get newPassword(): FormControl {
        return this.passwordForm.get('newPassword') as FormControl;
    }
    get confirmPassword(): FormControl {
        return this.passwordForm.get('confirmPassword') as FormControl;
    }
    handleCancel() {
        this.IsEdit = false;
    }
    handleCancelPasswordEdit() {
        this.updatePassword = false;
    }
    handleEdit() {
        this.IsEdit = true;
    }
    handleEditPassword() {
        this.updatePassword = true;
    }
    handleSubmit() {
        if (this.form.valid) {
            this.submitting = true;
            const command: IUpdateProfileCommand = {
                firstName: this.firstName.value,
                lastName: this.lastName.value,
                position: this.position.value,
                title: this.title.value,
                userName: this.userName.value,
                email: this.email.value,
                phoneNumber: this.phone.value
            };

            this.unitOfWorkService.authorization.updateProfile(command).subscribe({
                next: (response) => {
                    this.toastrService.success(response.message);
                    localStorage.setItem(LocalStorageKeys.UNAME, response.data.userName);
                    this.authService.loggedInUserSignal.update(() => response.data);
                },
                error: () => (this.submitting = false),
                complete: () => {
                    this.submitting = false;
                    this.IsEdit = false;
                }
            });
        }
    }
    handleSubmitNewPassword() {
        if (this.passwordForm.valid) {
            this.submittingPassword = true;
            const command: IChangePasswordCommand = {
                oldPassword: this.oldPassword.value,
                newPassword: this.newPassword.value
            };

            this.unitOfWorkService.authorization.changePassword(command).subscribe({
                next: (data) => {
                    this.toastrService.success(data.message);
                },
                error: () => (this.submittingPassword = false),
                complete: () => {
                    this.submittingPassword = false;
                    this.updatePassword = false;
                }
            });
        }
    }

    baseOnDestroy(): void {
        this.unitOfWorkService.unsubscribe();
    }
}
