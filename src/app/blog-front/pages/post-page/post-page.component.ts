import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-post-page',
  imports: [],
  templateUrl: './post-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostPageComponent { }
