import { ChangeDetectionStrategy, Component, computed } from '@angular/core';

@Component({
  selector: 'front-footer',
  imports: [],
  templateUrl: './front-footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrontFooterComponent {

  currentDate = computed(() => {
    return new Date();
  })

}
