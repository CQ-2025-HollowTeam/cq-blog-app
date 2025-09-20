import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthButtonComponent } from '@auth/components/auth-button/auth-button.component';

@Component({
    selector: 'front-navbar',
    imports: [RouterLink, AuthButtonComponent],
    templateUrl: './front-navbar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrontNavbarComponent {}
