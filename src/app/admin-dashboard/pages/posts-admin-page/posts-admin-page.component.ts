import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { PostSearchFormComponent } from '../../../posts/components/post-search-form/post-search-form.component';
import { PostsTableComponent } from '../../../posts/components/posts-table/posts-table.component';
import { RouterLink } from '@angular/router';
import { PostService } from '../../../posts/services/post.service';
import { rxResource } from '@angular/core/rxjs-interop'
import { PaginationService } from '../../../shared/pagination/pagination.service';
import { PaginationComponent } from '../../../shared/pagination/pagination.component';
import { PostSearchService } from '../../../posts/components/post-search-form/post-search.service';

@Component({
  selector: 'app-posts-admin-page',
  imports: [
    PostSearchFormComponent,
    PostsTableComponent,
    RouterLink,
    PaginationComponent
  ],
  templateUrl: './posts-admin-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsAdminPageComponent {

  postService = inject(PostService);
  paginationService = inject(PaginationService);
  postSearchFilters = inject(PostSearchService);

  postsPerPage = signal<number>(3);

  postsResource = rxResource({
    params: () => ({
      page: this.paginationService.currentPage(),
      limit: this.postsPerPage(),
      search: this.postSearchFilters.search(),
    }),
    stream: ({params}) => {
      return this.postService.getPosts({
        page: params.page,
        limit: params.limit,
        search: params.search,
      });
    }
  });

}
