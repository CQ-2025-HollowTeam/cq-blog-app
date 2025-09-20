import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'

@Component({
  selector: 'comment-input-form',
  imports: [ReactiveFormsModule],
  templateUrl: './comment-input-form.component.html',
  styleUrl: './comment-input-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentInputFormComponent {

  fb = inject(FormBuilder);

  commentForm: FormGroup = this.fb.group({
    content: ['', Validators.required],
  });

  showActionBar = signal<boolean>(false);

  submit() {
    if(this.commentForm.invalid) return;
  }

}
