import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { Comment } from '../../interfaces/comment.interface';
import { PostCommentComponent } from '../post-comment/post-comment.component';
import { CommentInputFormComponent } from '../comment-input-form/comment-input-form.component';

@Component({
  selector: 'post-comments',
  imports: [PostCommentComponent, CommentInputFormComponent],
  templateUrl: './post-comments.component.html',
  styleUrl: './post-comments.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCommentsComponent {

  comments = input.required<Comment[]>();

}
