import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Post, PostsResponse } from '../interfaces/post.interface';
import { Observable, of, tap } from 'rxjs';

const emptyPost: Post = {
  id: 0,
  title: '',
  slug: '',
  content: '',
  authorId: '',
  createdAt:   new Date(),
  updatedAt:  new Date(),
  categories: [],
  author: null as any,
  image: '', 
  comments: [],
}

interface Options {
  limit?: number;
  page?: number;
  search?: string;
  categories?: string;
  author?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {

  http = inject(HttpClient);
  baseUrl = environment.baseUrl;

  getPosts(options: Options): Observable<PostsResponse> {
    const { page = 1, limit = 10, search = '', categories = '', author = '' } = options;

    const params: Options = {
      limit: limit,
      page: page,
      search: search,
    }
    if(categories) params['categories'] = categories;
    if(author) params['author'] = author;

    return this.http.get<PostsResponse>(`${this.baseUrl}/posts`, {
      params: params as any
    });
  }

  getTrendingPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/posts/trending`);
  }

  getPostById(id: number): Observable<Post> {
    if(!id && id != 0) {
      throw new Error('Post ID is required');
    }

    if(id == 0) {
      return of(emptyPost);
    }

    return this.http.get<Post>(`${this.baseUrl}/posts/${id}`);
  }

  createPost(postLike: Partial<Post>): Observable<Post> {
    return this.http.post<Post>(`${this.baseUrl}/posts`, postLike);
  }

  updatePost(id: number, postLike: Partial<Post>): Observable<Post> {
    return this.http.patch<Post>(`${this.baseUrl}/posts/${id}`, postLike);
  }

  removePost(id: number): Observable<Post> {
    return this.http.delete<Post>(`${this.baseUrl}/posts/${id}`);
  }


}
