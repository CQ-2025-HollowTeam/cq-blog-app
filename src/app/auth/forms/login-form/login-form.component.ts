import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../shared/utils/form-utils';
import { AuthService } from '../../services/auth.service';
import { HttpStatusCode } from '@angular/common/http';
import { APIError } from '@shared/interfaces/error.interface';

@Component({
    selector: 'login-form',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './login-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    formUtils = FormUtils;

    form = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
    });

    onLogin = output<void>();

    resetForm() {
        this.form.markAsUntouched();
        this.form.markAsPristine();
        this.form.reset();
    }

    login() {
        this.form.markAllAsTouched();
        if (this.form.invalid) return;

        const username = this.form.get('username')?.value ?? '';
        const password = this.form.get('password')?.value ?? '';

        this.authService.login({ username, password }).subscribe({
            next: ({ token }) => this.loginSuccess(token),
            error: (error: APIError) => this.loginError(error),
        });
    }

    loginSuccess(token: string) {
        localStorage.setItem('auth_token', token);
        this.onLogin.emit();
    }

    loginError(error: APIError) {
        switch (error.status) {
            case HttpStatusCode.Unauthorized:
                // TODO: Añadir alertas
                console.error('Login failed: Unauthorized', error);
                break;
        }
    }
}
