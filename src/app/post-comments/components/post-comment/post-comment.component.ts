import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { CommentInputFormComponent } from '../comment-input-form/comment-input-form.component';
import { Comment, NewReaction } from '../../interfaces/comment.interface';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { CommentService } from '../../services/comment.service';
import { firstValueFrom } from 'rxjs';

export enum ReactionType {
  LIKE = 1,
}

@Component({
  selector: 'post-comment',
  imports: [CommentInputFormComponent, DatePipe, UpperCasePipe],
  templateUrl: './post-comment.component.html',
  styleUrl: './post-comment.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCommentComponent {

  comment = input.required<Comment>();

  commentService = inject(CommentService);

  showInputForm = signal<boolean>(false);
  showReplies = signal<boolean>(false);
  likedComment = signal<boolean>(false);

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

  async addReaction() {
    const newReaction: NewReaction = {
      userId: '3c8df840-08f3-4eeb-a5b6-855fa91b0402', //TODO: Reemplazar por el ID de usuario autenticado
      reactionId: ReactionType.LIKE,
    }

    const reaction = await firstValueFrom(this.commentService.addReaction(this.comment().postId, this.comment().id, newReaction));
    if(reaction) {
      this.comment()._count!.reactions += 1;
      this.likedComment.set(true);
    }
  }
}
