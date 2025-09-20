import { ChangeDetectionStrategy, Component, computed, inject, input, linkedSignal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {

  perPage = input<number>(0);
  total = input<number>(0);
  currentPage = input<number>(1);

  router = inject(Router);

  activePage = linkedSignal(() => this.currentPage());

  setCurrentpage(page: number) {
    this.activePage.set(page);
    this.router.navigate([], {
        queryParams: { page: page },
        queryParamsHandling: 'merge', // Combina con los queryParams existentes
      });
  }

  getPagesList = computed(() => {
    return Array.from({length: Math.ceil(this.total() / this.perPage())}, (_, i) => i + 1);
  });
}
