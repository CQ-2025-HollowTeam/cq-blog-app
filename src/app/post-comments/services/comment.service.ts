
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, tap } from 'rxjs';
import { Comment, CommentResponse, NewComment, NewReaction } from '../interfaces/comment.interface';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  http = inject(HttpClient);
  baseUrl = environment.baseUrl;

  getPostCommments(postId: number): Observable<CommentResponse> {
    return this.http.get<CommentResponse>(`${this.baseUrl}/posts/${postId}/comments`);
  }

  createComment(postId: number, newComment: NewComment): Observable<Comment> {
    return this.http.post<Comment>(`${this.baseUrl}/posts/${postId}/comments`, newComment);
  }

  addReaction(postId: number, commentId: number, newReaction: NewReaction){
    return this.http.post(`${this.baseUrl}/posts/${postId}/comments/${commentId}/reactions`, newReaction);
  } 

}
