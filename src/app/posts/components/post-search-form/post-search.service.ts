import { inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, pipe, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PostSearchService {
    private activatedRoute = inject(ActivatedRoute);

    search = toSignal(
        this.activatedRoute.queryParamMap.pipe(
            map((params) => params.get('search') ?? '')
        ),
        {
            initialValue: '',
        }
    );

    category = toSignal(
        this.activatedRoute.queryParamMap.pipe(
            map((params) => params.get('category') ?? '')
        ),
        {
            initialValue: '',
        }
    );

    author = toSignal(
        this.activatedRoute.queryParamMap.pipe(
            map((params) => params.get('author') ?? '')
        ),
        {
            initialValue: '',
        }
    );
}
