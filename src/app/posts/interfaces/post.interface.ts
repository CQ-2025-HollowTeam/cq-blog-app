import { User } from "../../authors/interfaces/user.interface";
import { Category } from "../../categories/interfaces/category.interface";

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

export interface Meta {
    total:    number;
    page:     number;
    lastPage: number;
}
