import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-blog-front-layout',
  imports: [RouterOutlet],
  templateUrl: './blog-front-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogFrontLayoutComponent { }
