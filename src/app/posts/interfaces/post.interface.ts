export interface PostsResponse {
    data: Post[];
    meta: Meta;
}

export interface Post {
    id:         number;
    title:      string;
    slug:       string;
    content:    string;
    authorId:   string;
    createdAt:  Date;
    updatedAt:  Date;
    categories: Category[];
    author:     User;
    image?:     string; //Cambiar cuando se implemente
    comments?:   Comment[];
}

export interface User {
    id:        string;
    username:  string;
    email:     string;
    name:      string;
    password:  string;
    role:      number;
    isActive:  boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Category {
    id:        number;
    name:      string;
    slug:      string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Comment {
    id:        number;
    content:   string;
    authorId:  string;
    postId:    number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Meta {
    total:    number;
    page:     number;
    lastPage: number;
}
