import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserService } from '@shared/services/user.service';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-profile',
    imports: [],
    templateUrl: './profile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
    private userService = inject(UserService);

    userResource = rxResource({
        params: () => ({}),
        stream: () => this.userService.getUserMock(),
    });
}
