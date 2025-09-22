import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { environment } from '@environments/environment';
import { UserService } from '@shared/services/user.service';
import { firstValueFrom, Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private http = inject(HttpClient);
    private userService = inject(UserService);
    private baseUrl: string = `${environment.baseUrl}/auth`;

    checkStatusResource = rxResource({
        stream: () => this.checkAuthStatus(),
    });

    private _token = signal<string | null>(localStorage.getItem('auth_token'));

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
        return this.http
            .post<{ token: string }>(`${this.baseUrl}/register`, credentials)
            .pipe(
                map((resp) => this.handleAuthSuccess(resp)),
                tap((success) => {
                    if (success) this.userService.getUser().subscribe();
                }),
                catchError((error: any) => this.handleAuthError(error))
            );
    }

    // Este método hace la llamada al backend
    checkUsernameOrEmail(value: string): Observable<boolean> {
        return this.http.get<boolean>(
            `${environment.baseUrl}/users/check-availability`,
            { params: { value } }
        );
    }

    // Este método hace la llamada al backend
    checkEmail(email: string): Observable<boolean> {
        return this.http
            .get<{ answer: 'yes' | 'no' | 'maybe' }>(`${this.baseUrl}`)
            .pipe(map((response) => response.answer === 'yes'));
    }

    logout() {
        this._token.set(null);
        localStorage.removeItem('auth_token');
    }

    saveToken(token: string) {
        this._token.set(token);
        localStorage.setItem('auth_token', token);
    }

    checkAuthStatus(): Observable<boolean> {
        const token = localStorage.getItem('auth_token');
        if (!token) return of(false);
        if (this.userService.user()) return of(true); // Evita petición si ya ha sido guardado con anterioridad

        return this.userService.getUser().pipe(
            map((user) => !!user),
            tap((isAuthenticated) => {
                if (!isAuthenticated) this.logout();
            })
        );
    }

    private handleAuthSuccess({ token }: { token: string }) {
        this._token.set(token);
        localStorage.setItem('auth_token', token);
        return true;
    }

    private handleAuthError(_: any) {
        this.userService.clearUser();
        this.logout();
        return of(false);
    }
}
