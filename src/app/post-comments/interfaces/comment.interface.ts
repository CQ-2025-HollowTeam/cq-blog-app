import { User } from '@shared/interfaces/user.interface';

export interface CommentResponse {
    data: Comment[];
    meta: Meta;
}

export interface Comment {
    id: number;
    content: string;
    parentId: number;
    authorId: string;
    postId: number;
    createdAt: Date;
    updatedAt: Date;
    author: User;
    reactions?: Reaction[];
    replies?: any[];
    _count?: Count;
}

export interface NewComment {
    authorId: string;
    content: string;
    parentId: number;
}

export interface NewReaction {
    userId: string;
    reactionId: number;
}

export interface Count {
    reactions: number;
    replies: number;
}

export interface Reaction {
    id: number;
    userId: string;
    commentId: number;
    reactionId: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Meta {
    total: number;
    page: number;
    lastPage: number;
}
