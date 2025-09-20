import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { UserService } from '@shared/services/user.service';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private http = inject(HttpClient);
    private userService = inject(UserService);
    private baseUrl: string = `${environment.baseUrl}/auth`;

    private _token = signal<string | null>(localStorage.getItem('token'));

    token = computed<string | null>(() => this._token());

    login(credentials: { username: string; password: string }) {
        return this.http
            .post<{ token: string }>(`${this.baseUrl}/login`, credentials)
            .pipe(
                map((resp) => this.handleAuthSuccess(resp)),
                tap((success) => {
                    if (success) this.userService.getUser().subscribe();
                }),
                catchError((error: any) => this.handleAuthError(error))
            );
    }

    register(credentials: {
        name: string;
        email: string;
        username: string;
        password: string;
    }) {
        console.log('Registering with credentials:', credentials);
    }

    // Este método hace la llamada al backend
    checkUsername(username: string): Observable<boolean> {
        return this.http
            .get<{ answer: 'yes' | 'no' | 'maybe' }>(`${this.baseUrl}`)
            .pipe(map((response) => response.answer === 'yes'));
    }

    // Este método hace la llamada al backend
    checkEmail(email: string): Observable<boolean> {
        return this.http
            .get<{ answer: 'yes' | 'no' | 'maybe' }>(`${this.baseUrl}`)
            .pipe(map((response) => response.answer === 'yes'));
    }

    logout() {
        this._token.set(null);
        localStorage.removeItem('token');
    }

    private handleAuthSuccess({ token }: { token: string }) {
        this._token.set(token);
        localStorage.setItem('token', token);
        return true;
    }

    private handleAuthError(_: any) {
        this.userService.clearUser();
        this.logout();
        return of(false);
    }
}
