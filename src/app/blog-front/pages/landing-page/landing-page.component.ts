import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { CardLayout, PostCardComponent } from '../../../posts/components/post-card/post-card.component';
import { PostSearchFormComponent } from '../../../posts/components/post-search-form/post-search-form.component';
import { PostsCarouselComponent } from '../../../posts/components/posts-carousel/posts-carousel.component';
import { PostService } from '../../../posts/services/post.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { PostSearchService } from '../../../posts/components/post-search-form/post-search.service';
import { sign } from 'crypto';
import { Post } from '../../../posts/interfaces/post.interface';
import { tap } from 'rxjs';

@Component({
  selector: 'app-landing-page',
  imports: [
    PostCardComponent,
    PostSearchFormComponent,
    PostsCarouselComponent
  ],
  templateUrl: './landing-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {

  postService = inject(PostService);
  postSearchService = inject(PostSearchService);

  limit = 4;
  currentPage = signal<number>(1);
  showMoreButton = signal<boolean>(true);

  landingPosts = signal<Post[]>([]);

  resetPostsEffect = effect(() => {
      this.postSearchService.search();
      this.currentPage.set(1);
      this.landingPosts.set([]);
      this.showMoreButton.set(true);
  });

  postsResource = rxResource({
    params: () => ({
      search: this.postSearchService.search(),
      limit: this.limit,
      page: this.currentPage(),
    }),
    stream: ({ params }) => {
      return this.postService.getPosts(params).pipe(
        tap(response => {
          if (params.page > 1) {
            this.landingPosts.update(posts => [...posts, ...response.data]);
          } else {
            this.landingPosts.set(response.data);
          }
        }),
        tap(response => {
          if (response.meta.total <= this.landingPosts().length) {
            this.showMoreButton.set(false);
          } else {
            this.showMoreButton.set(true);
          }
        })
      );
    }
  });


  addPage() {
    this.currentPage.update( page => page + 1 );
  }

  cardLayout = CardLayout;

}
