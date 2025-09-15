import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { Comment } from '../../interfaces/comment.interface';
import { CommentInputFormComponent } from '../comment-input-form/comment-input-form.component';

@Component({
  selector: 'post-comment',
  imports: [CommentInputFormComponent],
  templateUrl: './post-comment.component.html',
  styleUrl: './post-comment.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCommentComponent {

  comment = input.required<Comment>();

  showInputForm = signal<boolean>(false);
  showReplies = signal<boolean>(false);

  toggleInputForm() {
    this.showInputForm.update((value) => {
      return !value;
    });
  }

  toggleShowReplies() {
    this.showReplies.update((value) => {
      return !value;
    });
  }

}
