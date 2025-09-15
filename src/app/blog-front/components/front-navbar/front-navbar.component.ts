import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'front-navbar',
  imports: [RouterLink],
  templateUrl: './front-navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrontNavbarComponent { }
