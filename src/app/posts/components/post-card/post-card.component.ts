import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Post } from '../../interfaces/post.interface';
import { RouterLink } from '@angular/router';
import { PostCategoryComponent } from '../../../categories/components/post-category/post-category.component';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { PostImagePipe } from '../../pipes/post-image.pipe';

export enum CardLayout {
  BIG,
  SMALL,
}

@Component({
  selector: 'post-card',
  imports: [
    RouterLink, 
    PostCategoryComponent, 
    DatePipe, 
    UpperCasePipe,
    PostImagePipe,
  ],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCardComponent {

  post = input.required<Post>();
  layoutType = input.required<CardLayout>();

  cardLayout = CardLayout;
  
}
