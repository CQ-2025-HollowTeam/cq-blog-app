import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Post } from '../../interfaces/post.interface';
import { RouterLink } from '@angular/router';
import { PostCategoryComponent } from '../../../categories/components/post-category/post-category.component';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { PostImagePipe } from '../../pipes/post-image.pipe';

@Component({
  selector: 'posts-table',
  imports: [
    RouterLink, 
    PostCategoryComponent, 
    DatePipe, 
    UpperCasePipe,
    PostImagePipe,
  ],
  templateUrl: './posts-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsTableComponent {

  posts = input.required<Post[]>();

}
