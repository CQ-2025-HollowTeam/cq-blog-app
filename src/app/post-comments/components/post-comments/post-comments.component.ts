import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { PostCommentComponent } from '../post-comment/post-comment.component';
import { CommentInputFormComponent } from '../comment-input-form/comment-input-form.component';
import { CommentService } from '../../services/comment.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'post-comments',
  imports: [PostCommentComponent, CommentInputFormComponent],
  templateUrl: './post-comments.component.html',
  styleUrl: './post-comments.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCommentsComponent {

  postId = input.required<number>();

  commentService = inject(CommentService);

  commentResource = rxResource({
    params: () => ({
      postId: this.postId(),
    }),
    stream: ({params}) => {
      return this.commentService.getPostCommments(params.postId!);
    }
  });

}
