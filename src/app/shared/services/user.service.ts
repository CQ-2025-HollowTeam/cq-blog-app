import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { User } from '@shared/interfaces/user.interface';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    private http = inject(HttpClient);
    private baseUrl: string = environment.baseUrl;

    private _user = signal<User | null>(null);
    user = computed<User | null>(() => this._user());

    private userCache = new Map<string, User>();

    getUser(): Observable<User | null> {
        if (this._user()) return of(this._user());

        return this.http.get<User>(`${this.baseUrl}/users/me`).pipe(
            tap((user) => this.handleUserSuccess(user)),
            catchError((error: any) => this.handleUserError(error))
        );
    }

    getUserById(id: string): Observable<User | null> {
        if (this.userCache.has(id)) return of(this.userCache.get(id)!);

        return this.http.get<User>(`${this.baseUrl}/users/${id}`).pipe(
            tap((user) => this.saveUserToCache(user)),
            catchError((error: any) => this.handleUserError(error))
        );
    }

    clearUser() {
        this._user.set(null);
    }

    updateUser(
        id: string,
        form: Partial<{
            username: string | null;
            name: string | null;
            email: string | null;
        }>
    ): Observable<User | null> {
        return this.http.patch<User>(`${this.baseUrl}/users/${id}`, form).pipe(
            tap((user) => this.handleUserSuccess(user)),
            catchError((error: any) => this.handleUserError(error))
        );
    }

    private handleUserSuccess(response: User): boolean {
        console.log('UserService response:', response);
        this.saveUserToCache(response);
        this._user.set(response);
        return true;
    }

    private handleUserError(error: any): Observable<null> {
        console.error('UserService error:', error);
        return of(null);
    }

    private saveUserToCache(user: User) {
        if (user.id) this.userCache.set(user.id, user);
    }
}
