import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    input,
    model,
    output,
} from '@angular/core';

@Component({
    selector: 'modal-dialog',
    imports: [CommonModule],
    templateUrl: './modal-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: `
        header:has(div:empty){
            display: none;
        }
    `,
})
export class ModalDialogComponent {
    open = model<boolean>(false);
    modal = input<boolean>(false);

    size = input<'s' | 'm' | 'l' | 'full'>('m');
    showClose = input<boolean>(false);

    onClose = output<void>();

    close() {
        this.onClose.emit();
        this.open.set(false);
    }
}
