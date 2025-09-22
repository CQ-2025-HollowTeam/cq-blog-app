import {
    ChangeDetectionStrategy,
    Component,
    effect,
    inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { map } from 'rxjs';

@Component({
    selector: 'app-oauth-page',
    imports: [],
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OauthPageComponent {
    activatedRoute = inject(ActivatedRoute);
    router = inject(Router);
    authService = inject(AuthService);

    token = toSignal(
        this.activatedRoute.params.pipe(map((params) => params['token']))
    );

    saveTokenEffect = effect(() => {
        const token = this.token();
        if (!token) {
            this.router.navigateByUrl('/');
            return;
        }
        this.authService.saveToken(token);
        this.router.navigateByUrl('/');
    });
}
