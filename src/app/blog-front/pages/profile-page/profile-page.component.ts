import {
    ChangeDetectionStrategy,
    Component,
    inject,
    signal,
} from '@angular/core';
import { UserService } from '@shared/services/user.service';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ProfileHeaderComponent } from './components/profile-header/profile-header.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { ChangePasswordFormComponent } from './components/change-password-form/change-password-form.component';
import { ToggleGroupComponent } from '@shared/components/toggle-group/toggle-group.component';
import { User } from '@shared/interfaces/user.interface';

enum Tabs {
    INFO = 1,
    CHANGE_PASSWORD = 2,
}

@Component({
    selector: 'app-profile-page',
    imports: [
        ProfileHeaderComponent,
        ProfileFormComponent,
        ChangePasswordFormComponent,
        ToggleGroupComponent,
    ],
    templateUrl: './profile-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePageComponent {
    private userService = inject(UserService);
    Tabs = Tabs;

    tabs = [
        { label: 'Información Personal', value: Tabs.INFO },
        { label: 'Cambiar Contraseña', value: Tabs.CHANGE_PASSWORD },
    ];
    activeTab = signal<Tabs>(Tabs.INFO);

    editable = signal(false);

    userResource = rxResource({
        params: () => ({}),
        stream: () => this.userService.getUserMock(),
    });

    updateUser(user: User) {
        this.userResource.value.set(user);
    }
}
