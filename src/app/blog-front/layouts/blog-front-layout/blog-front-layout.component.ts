import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FrontNavbarComponent } from '../../components/front-navbar/front-navbar.component';
import { FrontFooterComponent } from '../../components/front-footer/front-footer.component';

@Component({
  selector: 'app-blog-front-layout',
  imports: [RouterOutlet, FrontNavbarComponent, FrontFooterComponent],
  templateUrl: './blog-front-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogFrontLayoutComponent {}
