import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    effect,
    inject,
    input,
    OnInit,
    output,
    signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '@shared/interfaces/user.interface';
import { UserService } from '@shared/services/user.service';
import { FormUtils } from '@shared/utils/form-utils';

@Component({
    selector: 'profile-form',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './profile-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileFormComponent implements OnInit {
    private fb = inject(FormBuilder);
    userService = inject(UserService);
    formUtils = FormUtils;

    user = input.required<User>();
    readonly = input<boolean>(true);

    onSubmit = output<User>();

    editable = signal(false);
    form = this.fb.group({
        username: ['', Validators.required],
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
    });

    enableFormEffect = effect(() =>
        this.editable() ? this.form.enable() : this.form.disable()
    );

    ngOnInit() {
        this.form.patchValue(this.user());
    }

    resetForm() {
        this.form.reset(this.user());
        this.editable.set(false);
    }

    updateUser() {
        this.form.markAllAsTouched();
        if (this.form.invalid) return;
        const id = this.user().id;
        if (!id) return;
        const value = this.form.value;
        this.userService.updateUser(id, value).subscribe(() => {
            this.onSubmit.emit({ ...this.user(), ...this.form.value } as User);
            this.editable.set(false);
        });
    }
}
