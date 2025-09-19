import { CommonModule, NgClass } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    input,
    model,
    output,
} from '@angular/core';

@Component({
    selector: 'toggle-group',
    imports: [CommonModule],
    templateUrl: './toggle-group.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleGroupComponent {
    options = input.required<{ label: string; value: number }[]>();
    value = model.required<number>();

    onChange = output<number>();
}
