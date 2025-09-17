import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { User } from '@shared/interfaces/user.interface';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    private http = inject(HttpClient);
    private baseUrl: string = environment.apiUrl;

    getUser(): Observable<User> {
        return this.http.get<User>(`${this.baseUrl}/user`);
    }

    getUserMock(): Observable<User> {
        return of({
            id: '09a653cc-892f-4caa-b562-672f6152a012',
            username: 'jany.berge91',
            name: 'Lucas Watsica',
            email: 'wellington63@yahoo.com',
            role: 0,
            img: 'https://files.cdn.thinkific.com/file_uploads/643563/images/b49/982/89c/FERNANDO.png',
        });
    }
}
