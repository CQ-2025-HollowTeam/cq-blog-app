import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
import { PostsCarouselComponent } from '../../../posts/components/posts-carousel/posts-carousel.component';
import { PostCategoryComponent } from '../../../categories/components/post-category/post-category.component';
import { PostCommentsComponent } from '../../../post-comments/components/post-comments/post-comments.component';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { CardLayout } from '../../../posts/components/post-card/post-card.component';
import { PostService } from '../../../posts/services/post.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { PostImagePipe } from '../../../posts/pipes/post-image.pipe';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-post-page',
  imports: [
    PostsCarouselComponent, 
    PostCategoryComponent, 
    PostCommentsComponent, 
    DatePipe, 
    UpperCasePipe,
    PostImagePipe
  ],
  templateUrl: './post-page.component.html',
  styleUrl: './post-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostPageComponent {

  activatedRoute = inject(ActivatedRoute);
  postService = inject(PostService);
  sanitizer = inject(DomSanitizer);

  safeContent = signal<SafeHtml>('');

  postId = toSignal(
    this.activatedRoute.params.pipe(
      map(params => params['slug']),
    )
  );

  postResource = rxResource({
    params: () => ({
      postId: this.postId(),
    }),
    stream: ({params}) => {
      return this.postService.getPostById(params.postId).pipe(
        tap(post => {
          this.safeContent.set(this.sanitizer.bypassSecurityTrustHtml(post.content));
        }),
        switchMap(post => {
          return this.postService.getPosts({categories: post.categories.map(cat => cat.slug).join(',')}).pipe(
            map(relatedPosts => ({ post, relatedPosts }))
          )
        }),
      );
    }
  });

  cardLayout = CardLayout;

}
