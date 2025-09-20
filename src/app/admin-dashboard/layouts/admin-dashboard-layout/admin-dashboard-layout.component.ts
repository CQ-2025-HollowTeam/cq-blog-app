import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FrontNavbarComponent } from '../../../blog-front/components/front-navbar/front-navbar.component';
import { FrontFooterComponent } from '../../../blog-front/components/front-footer/front-footer.component';

@Component({
  selector: 'app-admin-dashboard-layout',
  imports: [RouterOutlet, FrontNavbarComponent, FrontFooterComponent],
  templateUrl: './admin-dashboard-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardLayoutComponent { }
