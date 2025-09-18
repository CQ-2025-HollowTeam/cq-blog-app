import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private http = inject(HttpClient);
    private baseUrl: string = `${environment.apiUrl}/auth`;

    login(credentials: { username: string; password: string }) {
        return this.http.post<{ token: string }>(
            `${this.baseUrl}/login`,
            credentials
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
}
