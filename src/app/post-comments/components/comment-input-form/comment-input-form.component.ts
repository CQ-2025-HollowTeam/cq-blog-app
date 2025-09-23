import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { CommentService } from '../../services/comment.service';
import { Comment, NewComment } from '../../interfaces/comment.interface';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'comment-input-form',
  imports: [ReactiveFormsModule],
  templateUrl: './comment-input-form.component.html',
  styleUrl: './comment-input-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentInputFormComponent {

  postId = input.required<number>();
  newComment = output<Comment>();


  fb = inject(FormBuilder);
  commentService = inject(CommentService);

  commentForm: FormGroup = this.fb.group({
    content: ['', Validators.required],
  });

  showActionBar = signal<boolean>(false);

  async submit() {
    if(this.commentForm.invalid) return;

    const newCommentLike: NewComment = {
      content: this.commentForm.value.content,
      parentId: 0,
    }

    const newComment: Comment = await firstValueFrom(this.commentService.createComment(this.postId(), newCommentLike));
    if(newComment) {
      this.newComment.emit(newComment);
      this.commentForm.reset();
    }
  }

}
