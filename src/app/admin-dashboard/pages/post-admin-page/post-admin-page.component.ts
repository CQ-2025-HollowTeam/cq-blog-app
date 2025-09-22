import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { PostFormComponent } from './post-form/post-form.component';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { PostService } from '../../../posts/services/post.service';

@Component({
  selector: 'app-post-admin-page',
  imports: [PostFormComponent],
  templateUrl: './post-admin-page.component.html',
  styleUrl: './post-admin-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostAdminPageComponent {

  activatedRoute = inject(ActivatedRoute);
  postService = inject(PostService);
  router = inject(Router);

  postId = toSignal(
    this.activatedRoute.params.pipe(
      map(params => params['id']),
      map(id => {
        if(id == 'new') {
          return 0;
        } else {
          return Number(id);
        }
      }),
    )
  );

  title = computed(() => {
    return this.postId() === 0 ? 'Crear Post' : 'Editar Post';
  });

  postResource = rxResource({
    params: () => ({
      postId: this.postId(),
    }),
    stream: ({params}) => {
      return this.postService.getPostById(params.postId!);
    }
  });

  redirectEffect = effect(() => {
    if(this.postResource.error()) {
      this.router.navigateByUrl('/admin/posts');
    }
  });


}