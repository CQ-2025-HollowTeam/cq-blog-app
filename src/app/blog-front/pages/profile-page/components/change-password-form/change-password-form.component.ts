import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    input,
    output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '@shared/interfaces/user.interface';
import { FormUtils } from '@shared/utils/form-utils';

@Component({
    selector: 'change-password-form',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './change-password-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordFormComponent {
    private fb = inject(FormBuilder);
    formUtils = FormUtils;

    user = input.required<User>();
    onSubmit = output<User>();

    form = this.fb.group(
        {
            oldPassword: ['', Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
        },
        {
            validators: FormUtils.isFieldEqualToOther(
                'password',
                'confirmPassword',
                'passwordsMismatch'
            ),
        }
    );

    updatePassword() {
        this.form.markAllAsTouched();
        if (this.form.invalid) return;
        // Todo: Hacer petición para actualizar la contraseña
        this.onSubmit.emit({ ...this.user(), ...this.form.value } as User);
    }
}
