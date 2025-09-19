import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { User } from '@shared/interfaces/user.interface';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    private http = inject(HttpClient);
    private baseUrl: string = environment.apiUrl;

    private _user = signal<User | null>(null);

    user = computed<User | null>(() => this._user());

    getUser(): Observable<User | null> {
        return this.http.get<User>(`${this.baseUrl}/user`).pipe(
            tap((user) => this._user.set(user)),
            catchError((error: any) => this.handleUserError(error))
        );
    }

    getUserMock(): Observable<User> {
        return of({
            id: '09a653cc-892f-4caa-b562-672f6152a012',
            username: 'jany.berge91',
            name: 'Lucas Watsica',
            email: 'wellington63@yahoo.com',
            role: 0,
            img: 'https://media.istockphoto.com/id/1682296067/es/foto/feliz-retrato-de-estudio-o-hombre-profesional-agente-de-bienes-raíces-o-hombre-de-negocios.jpg?s=612x612&w=0&k=20&c=1c4QU0U5FDIpTh08fzH1xo-P8HnXFAHSz09biId8p84=',
            createdAt: new Date('2023-01-15T10:00:00Z'),
            updatedAt: new Date('2023-10-20T15:30:00Z'),
        });
    }

    clearUser() {
        this._user.set(null);
    }

    private handleUserError(error: any): Observable<null> {
        console.error('UserService error:', error);
        return of(null);
    }
}
