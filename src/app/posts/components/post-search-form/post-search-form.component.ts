import { ChangeDetectionStrategy, Component, effect, inject, input, linkedSignal, output, signal } from '@angular/core';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';

export interface SearchForm {
  searchValue: string;
}

@Component({
  selector: 'post-search-form',
  imports: [],
  templateUrl: './post-search-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostSearchFormComponent {

  router = inject(Router);

  currentSearchValue = input<string>('');
  dabounceTime = input<number>(500);

  inputSearchValue = linkedSignal<string>(() => this.currentSearchValue());

  debounceEffect = effect((onCleanup) => {
    const value = this.inputSearchValue();
    const time = setTimeout(() => {
      this.router.navigate([], {
        queryParams: { search: value },
        queryParamsHandling: 'merge', // Combina con los queryParams existentes
      });

    }, this.dabounceTime());

    onCleanup(() => {
      clearTimeout(time);
    });
  });

}
