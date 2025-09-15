import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'post-category',
  imports: [],
  templateUrl: './post-category.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCategoryComponent {
  category = input<string>();
}
