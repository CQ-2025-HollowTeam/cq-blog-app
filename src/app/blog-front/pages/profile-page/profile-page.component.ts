import {
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
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
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

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
    router = inject(Router);
    activatedRoute = inject(ActivatedRoute);
    private userService = inject(UserService);

    Tabs = Tabs;

    selfUser = computed(this.userService.user);
    userId = toSignal(
        this.activatedRoute.params.pipe(map((params) => params['userId']))
    );

    editable = computed(() => (this.userId() ? false : true));

    selfUserEffect = effect(() => {
        const userId = this.userId();
        const selfUserId = this.selfUser()?.id;
        const isSelf = userId === selfUserId;
        if (isSelf) this.router.navigate(['/profile']);
    });

    tabs = [
        { label: 'Información Personal', value: Tabs.INFO },
        { label: 'Cambiar Contraseña', value: Tabs.CHANGE_PASSWORD },
    ];
    activeTab = signal<Tabs>(Tabs.INFO);

    userResource = rxResource({
        params: () => ({ userId: this.userId() }),
        stream: ({ params }) => {
            const userId = params.userId;

            if (userId) return this.userService.getUserById(userId);
            return this.userService.getUser();
        },
    });

    updateUser(user: User) {
        this.userResource.value.set(user);
    }
}
