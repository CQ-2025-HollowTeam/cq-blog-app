import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Category } from '../../interfaces/post.interface';

@Component({
  selector: 'post-category',
  imports: [],
  templateUrl: './post-category.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCategoryComponent {
  category = input<Category>();
}
