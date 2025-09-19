import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Post, PostsResponse } from '../interfaces/post.interface';
import { Observable, tap } from 'rxjs';

interface Options {
  limit?: number;
  page?: number;
  search?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {

  http = inject(HttpClient);
  baseUrl = environment.baseUrl;

  getPosts(options: Options): Observable<PostsResponse> {
    const { page = 1, limit = 10, search = '' } = options;

    return this.http.get<PostsResponse>(`${this.baseUrl}/posts`, {
      params: {
        limit: limit,
        page: page,
        search: search,
      }
    });
  }

  getPostById(id: string): Observable<Post> {
    if(!id) throw new Error('Post ID is required');

    return this.http.get<Post>(`${this.baseUrl}/posts/${id}`);
  }

}
