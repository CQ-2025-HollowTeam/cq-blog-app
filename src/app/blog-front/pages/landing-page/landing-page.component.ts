import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CardLayout, PostCardComponent } from '../../../posts/components/post-card/post-card.component';
import { PostSearchFormComponent } from '../../../posts/components/post-search-form/post-search-form.component';
import { PostsCarouselComponent } from '../../../posts/components/posts-carousel/posts-carousel.component';
import { Post } from '../../../posts/interfaces/post.interface';

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

  highlightedPosts = signal<Post[]>([
    {
      id: '123',
      authorId: '1234',
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      content: 'Lorem ipsum dolor sit acta officia natus debitis neque saepe quisquam iste fugiat architecto maxime at fugit obcaecati optio, voluptatem dolorem asperiores aliquid ipsum doloribus..',
      createdAt: new Date(),
      image: 'https://import.cdn.thinkific.com/643563/LeaTjvBRI6cldshD59jw_angular-de-cero.jpg',
      categories: ['Angular'],
    },
    {
      id: '123',
      authorId: '1234',
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      content: 'Lorem ipsum dolor sit acta officia natus debitis neque saepe quisquam iste fugiat architecto maxime at fugit obcaecati optio, voluptatem dolorem asperiores aliquid ipsum doloribus..',
      createdAt: new Date(),
      image: 'https://import.cdn.thinkific.com/643563/k6V4tlGTXmUQS8CGxGID_SQL.jpg',
      categories: ['SQL'],
    }
  ]);

  posts = signal<Post[]>([
    {
      id: '123',
      authorId: '1234',
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      content: 'Lorem ipsum dolor sit acta officia natus debitis neque saepe quisquam iste fugiat architecto maxime at fugit obcaecati optio, voluptatem dolorem asperiores aliquid ipsum doloribus..',
      createdAt: new Date(),
      image: 'https://import.cdn.thinkific.com/643563/8b0gaETkTXeL6iB3f1Pn_ASTRO.jpg',
      categories: ['Astro'],
    },
    {
      id: '123',
      authorId: '1234',
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      content: 'Lorem ipsum dolor sit acta officia natus debitis neque saepe quisquam iste fugiat architecto maxime at fugit obcaecati optio, voluptatem dolorem asperiores aliquid ipsum doloribus..',
      createdAt: new Date(),
      image: 'https://import.cdn.thinkific.com/643563/ZQiNIKAJR4upzwEpMIVt_C-SHARP-COVER%20(1).jpg',
      categories: ['C#'],
    },
    {
      id: '123',
      authorId: '1234',
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      content: 'Lorem ipsum dolor sit acta officia natus debitis neque saepe quisquam iste fugiat architecto maxime at fugit obcaecati optio, voluptatem dolorem asperiores aliquid ipsum doloribus..',
      createdAt: new Date(),
      image: 'https://import.cdn.thinkific.com/643563/MtehrUISVW8hP7CfCWV1_DOCKER.jpg',
      categories: ['Docker'],
    },
    {
      id: '123',
      authorId: '1234',
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      content: 'Lorem ipsum dolor sit acta officia natus debitis neque saepe quisquam iste fugiat architecto maxime at fugit obcaecati optio, voluptatem dolorem asperiores aliquid ipsum doloribus..',
      createdAt: new Date(),
      image: 'https://import.cdn.thinkific.com/643563/61TYzXMSTaKdnKUemoIn_FLUTTER-MOVIL-DE-CERO-A-EXPERTO.jpg',
      categories: ['Flutter'],
    },
    {
      id: '123',
      authorId: '1234',
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      content: 'Lorem ipsum dolor sit acta officia natus debitis neque saepe quisquam iste fugiat architecto maxime at fugit obcaecati optio, voluptatem dolorem asperiores aliquid ipsum doloribus..',
      createdAt: new Date(),
      image: 'https://import.cdn.thinkific.com/643563/T6It7zuNQPWizrBJvbaX_NEST-NEW.jpg',
      categories: ['Nest'],
    },
    {
      id: '123',
      authorId: '1234',
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      content: 'Lorem ipsum dolor sit acta officia natus debitis neque saepe quisquam iste fugiat architecto maxime at fugit obcaecati optio, voluptatem dolorem asperiores aliquid ipsum doloribus..',
      createdAt: new Date(),
      image: 'https://import.cdn.thinkific.com/643563/rJCXtKQUQSmgJSQbArul_java-avanzado-devtalles.jpg',
      categories: ['Java'],
    }
  ]);

  cardLayout = CardLayout;

}
