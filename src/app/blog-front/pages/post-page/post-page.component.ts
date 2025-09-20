import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { PostsCarouselComponent } from '../../../posts/components/posts-carousel/posts-carousel.component';
import { PostCategoryComponent } from '../../../posts/components/post-category/post-category.component';
import { PostCommentsComponent } from '../../../post-comments/components/post-comments/post-comments.component';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { CardLayout } from '../../../posts/components/post-card/post-card.component';
import { PostService } from '../../../posts/services/post.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { PostImagePipe } from '../../../posts/pipes/post-image.pipe';

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

  cardLayout = CardLayout;

  postSlug = toSignal(
    this.activatedRoute.params.pipe(map(params => params['slug']))
  );

  postResource = rxResource({
    params: () => ({  postSlug: this.postSlug() }),
    stream: ({params}) => this.postService.getPostBySlug(params.postSlug)
  });


  highlightedPosts = signal<any[]>([
    {
      id: '123',
      authorId: '1234',
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      content: 'Lorem ipsum dolor sit acta officia natus debitis neque saepe quisquam iste fugiat architecto maxime at fugit obcaecati optio, voluptatem dolorem asperiores aliquid ipsum doloribus..',
      createdAt: new Date(),
      image: 'https://import.cdn.thinkific.com/643563/T6It7zuNQPWizrBJvbaX_NEST-NEW.jpg',
      categories: ['Nest'],
      comments: [
        {
          id: 1,
          authorId: '123',
          content: 'Bla bla bla bla bla bla bla',
          post: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
    },
    {
      id: '123',
      authorId: '1234',
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      content: 'Lorem ipsum dolor sit acta officia natus debitis neque saepe quisquam iste fugiat architecto maxime at fugit obcaecati optio, voluptatem dolorem asperiores aliquid ipsum doloribus..',
      createdAt: new Date(),
      image: 'https://import.cdn.thinkific.com/643563/61TYzXMSTaKdnKUemoIn_FLUTTER-MOVIL-DE-CERO-A-EXPERTO.jpg',
      categories: ['Flutter'],
      comments: [
        {
          id: 1,
          authorId: '123',
          content: 'Bla bla bla bla bla bla bla',
          post: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
    }
  ]);
}
