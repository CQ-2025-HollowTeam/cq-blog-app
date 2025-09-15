import { Comment } from "../../post-comments/interfaces/comment.interface";

export interface Post {
    id: string;
    authorId: string,
    title: string;
    content: string;
    image: string;
    createdAt: Date,
    categories: string[],
    comments?: Comment[],
}