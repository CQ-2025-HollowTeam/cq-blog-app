import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
    selector: 'profile-image',
    imports: [],
    templateUrl: './profile-image.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileImageComponent {
    imageUrl = input.required<string>();
    showUploadButton = input<boolean>(false);
}
