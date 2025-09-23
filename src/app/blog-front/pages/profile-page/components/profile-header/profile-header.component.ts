import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { User } from '@shared/interfaces/user.interface';
import { ProfileImageComponent } from '../profile-image/profile-image.component';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'profile-header',
    imports: [ProfileImageComponent, DatePipe],
    templateUrl: './profile-header.component.html',
    styleUrl: './profile-header.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileHeaderComponent {
    user = input.required<User>();
    readonly = input<boolean>(false);
}
