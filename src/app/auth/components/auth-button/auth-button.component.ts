import {
    ChangeDetectionStrategy,
    Component,
    signal,
    viewChild,
} from '@angular/core';
import { ModalDialogComponent } from '../../../shared/components/modal-dialog/modal-dialog.component';
import { RouterLink } from '@angular/router';
import { LoginFormComponent } from '../../forms/login-form/login-form.component';
import { RegisterFormComponent } from '../../forms/register-form/register-form.component';

@Component({
    selector: 'auth-button',
    imports: [ModalDialogComponent, LoginFormComponent, RegisterFormComponent],
    templateUrl: './auth-button.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthButtonComponent {
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
}
