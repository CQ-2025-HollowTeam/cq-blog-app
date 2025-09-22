import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    signal,
    viewChild,
} from '@angular/core';
import { ModalDialogComponent } from '../../../shared/components/modal-dialog/modal-dialog.component';
import { Router, RouterLink } from '@angular/router';
import { LoginFormComponent } from '../../forms/login-form/login-form.component';
import { RegisterFormComponent } from '../../forms/register-form/register-form.component';
import { UserService } from '@shared/services/user.service';
import { ImagePipe } from '@shared/pipes/image.pipe';
import { AuthService } from '@auth/services/auth.service';
import { TitleCasePipe } from '@angular/common';

@Component({
    selector: 'auth-button',
    imports: [
        ModalDialogComponent,
        LoginFormComponent,
        RegisterFormComponent,
        RouterLink,
    ],
    templateUrl: './auth-button.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthButtonComponent {
    router = inject(Router);
    authService = inject(AuthService);
    userService = inject(UserService);

    user = computed(this.userService.user);

    loginDialog = signal(false);
    registerDialog = signal(false);

    openLogin() {
        this.registerDialog.set(false);
        this.loginDialog.set(true);
    }

    openRegister() {
        this.loginDialog.set(false);
        this.registerDialog.set(true);
    }

    logout() {
        this.authService.logout();
        this.loginDialog.set(false);
        this.registerDialog.set(false);
        this.userService.clearUser();
        this.router.navigate(['/']);
    }
}
