import { CommonModule, JsonPipe } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {
    emailValidator,
    usernameValidator,
} from '@shared/validators/user.validators';
import { FormUtils } from '@shared/utils/form-utils';

@Component({
    selector: 'register-form',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './register-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent {
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    formUtils = FormUtils;
    onRegister = output<void>();

    form = this.fb.group(
        {
            name: ['', Validators.required],
            email: [
                '',
                [Validators.required, Validators.email],
                [emailValidator()],
            ],
            username: ['', [Validators.required], [usernameValidator()]],
            password: [
                '',
                [
                    Validators.required,
                    Validators.pattern(
                        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
                    ),
                ],
            ],
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

    async register() {
        this.form.markAllAsTouched();
        if (this.form.invalid) return;

        const name = this.form.get('name')?.value ?? '';
        const email = this.form.get('email')?.value ?? '';
        const username = this.form.get('username')?.value ?? '';
        const password = this.form.get('password')?.value ?? '';
        this.authService
            .register({ name, email, username, password })
            .subscribe((isAuthenticated) => {
                if (isAuthenticated) this.onRegister.emit();
            });
    }

    resetForm() {
        this.form.markAsUntouched();
        this.form.markAsPristine();
        this.form.reset();
    }
}
