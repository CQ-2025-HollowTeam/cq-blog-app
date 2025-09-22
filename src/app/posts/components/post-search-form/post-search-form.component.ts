import { ChangeDetectionStrategy, Component, effect, inject, input, linkedSignal } from '@angular/core';
import { Router } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { CategoryService } from '../../../categories/services/category.service';
import { AuthorService } from '../../../authors/service/author.service';

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
  categoryService = inject(CategoryService);
  authorsService = inject(AuthorService);

  currentSearchValue = input<string>('');
  currentCategoryValue = input<string>('');
  currentAuthorValue = input<string>('');

  dabounceTime = input<number>(500);

  inputSearchValue = linkedSignal<string>(() => this.currentSearchValue());
  caegoryValue = linkedSignal<string>(() => this.currentCategoryValue());
  authorValue = linkedSignal<string>(() => this.currentAuthorValue());

  categoriesResource = rxResource({
    params: () => ({}),
    stream: ({params}) => {
      return this.categoryService.getCategories();
    }
  });

  authorsResource = rxResource({
    params: () => ({}),
    stream: ({params}) => {
      return this.authorsService.getAuthors();
    }
  });

  debounceEffect = effect((onCleanup) => {
    const value = this.inputSearchValue();
    const time = setTimeout(() => {
      this.router.navigate([], {
        queryParams: { search: value },
        queryParamsHandling: 'merge',
      });

    }, this.dabounceTime());

    onCleanup(() => {
      clearTimeout(time);
    });
  });

  categoryChanges(categoryId: string) {
    this.router.navigate([], {
      queryParams: { category: categoryId },
      queryParamsHandling: 'merge',
    });
  }

  authorChanges(authorName: string) {
    this.router.navigate([], {
      queryParams: { author: authorName },
      queryParamsHandling: 'merge',
    });
  }

}
