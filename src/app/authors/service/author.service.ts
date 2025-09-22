import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  http = inject(HttpClient);
  baseUrl = environment.baseUrl;

  getAuthors(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/authors`);
  }

}
