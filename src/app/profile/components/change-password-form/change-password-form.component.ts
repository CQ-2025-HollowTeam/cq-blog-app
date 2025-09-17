import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-change-password-form',
  imports: [],
  templateUrl: './change-password-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordFormComponent { }
